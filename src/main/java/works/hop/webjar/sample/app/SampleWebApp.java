package works.hop.webjar.sample.app;

import com.jarredweb.webjar.service.api.BasicsService;
import works.hop.webjar.sample.model.Item;
import java.util.HashMap;
import java.util.Map;
import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.jarredweb.webjar.web.app.AppRunnerBuilder;
import javax.ws.rs.PathParam;
import org.glassfish.jersey.server.mvc.Viewable;
import org.jtwig.JtwigModel;
import works.hop.webjar.sample.service.AppServices;
import works.hop.webjar.sample.service.SampleService;

@Path("/sample")
public class SampleWebApp {
    
    private static final Logger LOG = LoggerFactory.getLogger(SampleWebApp.class);
    
    @Inject
    private SampleService service;
    
    @GET
    @PermitAll
    public String helloWorld(){
        LOG.info("invoked 'helloWorld' method");
        return "Hello World!";
    }
    
    @GET
    @Path("json")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response helloJson(){
        LOG.info("invoked 'helloJson' method");
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Hello JSON");
        return Response.ok(data).build();
    }
    
    @GET
    @Path("xml")
    @Produces(MediaType.APPLICATION_XML)
    @PermitAll
    public Response helloXml(){
        LOG.info("invoked 'helloXml' method");
        return Response.ok(new Item(1l, "Hello XML")).build();
    }
    
    @GET
    @Path("service")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response helloService(){
        LOG.info("invoked 'helloService' method");
        String message = service.getMessage();
        return Response.ok(new Item(1l, message)).build();
    }
    
    public static void main(String[] args){
        //add system property -Dcontext.lookup=works.hop.webjar.sample.config.SampleAppConfig;
        System.setProperty("context.lookup", "works.hop.webjar.sample.config.SampleAppConfig");
        AppRunnerBuilder.init().create(args, SampleWebApp.class);
    }
    
    
    //TO ADD with tutorial
    @Inject
    private AppServices services;
    @Inject
    private BasicsService basics;

    public AppServices getServices() {
        return services;
    }

    public void setService(AppServices services) {
        this.services = services;
    }

    public BasicsService getBasics() {
        return basics;
    }

    public void setBasics(BasicsService basics) {
        this.basics = basics;
    }

    @GET
    @Path("/twig")
    @Produces(MediaType.TEXT_PLAIN)
    @PermitAll
    public Response twigHelloView() {
        LOG.info("executing twig 'quick-resources'");
        JtwigModel context = JtwigModel.newModel().with("var", "Twig World!!");
        return Response.ok(new Viewable("/hello", context)).build();
    }

    @GET
    @Path("/ftl")
    @Produces(MediaType.TEXT_PLAIN)
    @PermitAll
    public Response ftlHelloView() {
        LOG.info("executing ftl 'quick-resources'");
        Map<String, Object> context = new HashMap<>();
        context.put("var", "Ftl World!!");
        return Response.ok(new Viewable("/hello", context)).build();
    }

    @GET
    @Path("/blogs")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response fetchAllBlogs() {
        LOG.info("executing 'fetchAllBlogs'");
        Map<String, Object> context = new HashMap<>();
        context.put("blogs", services.getBasicsService().get().fetchBlogs().getEntity());
        return Response.ok(context).build();
    }

    @GET
    @Path("/user/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response fetchUserById(@PathParam("id") long id) {
        LOG.info("executing 'fetchUserById'");
        Map<String, Object> context = new HashMap<>();
        context.put("user", basics.findAccount(id).getEntity());
        return Response.ok(context).build();
    }
}
