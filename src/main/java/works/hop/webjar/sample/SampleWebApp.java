package works.hop.webjar.sample;

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
import works.hop.webjar.bridge.ext.AppRunnerBuilder;
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
}
