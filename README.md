Create a content website in under 10 minutes, powered by Java.

This project is an example of extending the webjar project to be able to use new resources with spring integration

You can generate a quickstart project using the webjar-quickstart-archetype to get started

mvn archetype:generate -DarchetypeGroupId=com.jarredweb.repo -DarchetypeArtifactId=webjar-quickstart-archetype -DarchetypeVersion=0.2-beta

Or you could roll out your project as detailed below

Example 1: Most basic request

1. Create maven jar project (you can optionally use the webjar archetype)

2. Required - Add webjar-jetty dependency

    <dependency>
        <groupId>com.jarredweb.repo</groupId>
        <artifactId>webjar-jetty</artifactId>
        <version>0.4.1-beta</version>
    </dependency>

3. Optional - Add compiler plugin and set source/target to 1.7

    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.6.1</version>
        <configuration>
            <source>1.7</source>
            <target>1.7</target>
        </configuration>
    </plugin>

4. Optional - Add Junit dependency (test scope)

    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>

5. Create class to bootstrap the web app

        @Path("/sample")
	public class SampleWebApp { 
    
	    @GET
            @PermitAll
	    public String helloWorld(){
	        return "Hello World!";
	    }
	}

6. Add main method for entry point and execute

    public static void main(String[] args){
        AbstractRunner.init().create(args, SampleWebApp.class);
    }

7. Open browser and navigate to "http://localhost:8082/ws/sample"

Notes:

1. SampleWebApp is a plain-old jax-rs compliant resource class
2. AbstractRunner.init(...) is used to create an instance of the AbstractRunner class, with optional Spring configuration
2. AbstractRunner.create(...) is an overloaded method for registering jax-rs resources with the http server
3. The default application context is '/ws' but this is configurable in 'app-config.properties' via 'app.paths.entry'
4. @PermitAll is required on any resource method that allows non-authenticated access

Example 2: Changing context root

1. Add 'app-config.properties' in the application root folder and override 'app.paths.entry' value with '/foo'

2. Restart the server

3. Open browser and navigate to "http://localhost:8082/foo/sample"

Example 3: Returning json

1. Create handler method

    @GET
    @Path("json")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response helloJson(){
        LOG.info("invoked 'helloJson' method");
        Map<String, Object> data = new HashMap<>();
        data.put("message", "Hello World");
        return Response.ok(data).build();
    }

2. Restart the server

3. Open browser and navigate to "http://localhost:8082/foo/sample/json"

Notes:

1. @Produces informs application to encode response as JSON
2. Using Response as return values allows you to customize the response for the client to understand the intent

Example 4. Returning XML

1. Create a model class for the XML
    
    @XmlRootElement
    public class Item {

        private Long id;
        private String name;

        public Item() {
            super();
        }

        public Item(Long id, String name) {
            this.id = id;
            this.name = name;
        }

        //setters and getters
    }

2. Create handler method

    Path("xml")
    @Produces(MediaType.APPLICATION_XML)
    @PermitAll
    public Response helloXml(){
        LOG.info("invoked 'helloXml' method");
        return Response.ok(new Item(1l, "Hello XML")).build();
    }

3. Restart the server

4. Open browser and navigate to "http://localhost:8082/foo/sample/xml"

Notes:

1. @XmlRootElement is required only for generating the XML
2. @Produces informs application to encode response as XML

Example 5: Render content using a Twig template

1. Create a "www" directory in your project root. This will contain public content

2. Create a simple twig template (hello.twig) and save in this folder

    Hellooo ${ var }

3. Create a handler method

    @GET
    @Path("/twig")
    @Produces(MediaType.TEXT_PLAIN)
    @PermitAll
    public Response twigHelloView() {
        LOG.info("executing twig endpoint");
        JtwigModel context = JtwigModel.newModel().with("var", "Twig World!!");
        return Response.ok(new Viewable("/hello", context)).build();
    }

4. Restart the server

5. Open browser and navigate to "http://localhost:8082/foo/sample/twig"

Notes:

1. The directory "www" is designated as the default directory for serving web content. This can be overriden using the "app.assets.dir" property in the app-config.properties file
2. Twig requires a JtwigModel for the template context
3. The path to the template is simply the template name (minus extension) relative to the assets directory ("www" in this case)

Example 6: Render content using a Freemarker template

1. Create a "templates/freemarker" directory in the /src/main/resources folder. This is where freemarker is configured to look for templates

2. Create a simple freemarker template (hello.ftl) and save in this folder

    Hellooo ${ var }

3. Create a handler method

    @GET
    @Path("/ftl")
    @Produces(MediaType.TEXT_PLAIN)
    @PermitAll
    public Response ftlHelloView() {
        LOG.info("executing ftl endpoint");
        Map<String, Object> context = new HashMap<>();
        context.put("var", "Ftl World!!");
        return Response.ok(new Viewable("/hello", context)).build();
    }

4. Restart the server

5. Open browser and navigate to "http://localhost:8082/foo/sample/ftl"

Notes:

1. The directory "templates/freemarker" is designated as the default directory for serving freemarker templates. There can be overriden by changing the "jersey.config.server.mvc.templateBasePath.freemarker" in the Jersey's Resource Configuration.
   I will revisit this later on when looking at how to customize the ResourceConfig
2. Freemarker requires a Map model for the template context
3. The path to the template is simply the template name (minus extension) relative to the claapath directory ("templates/freemarker" in this case)

Example 7. Using a Spring service

1. Create a service class (with an optional interface)

    public interface SampleService {

        String getMessage();

        void setMessage(String message);
    }
    
    @Service
    public class SampleServiceImpl implements SampleService{

        @Value("${service.message}")
        private String message;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

2. Create a spring configuration (using annotations in this example)

    @Configuration
    @PropertySource({"classpath:sample-service.properties"})
    @ComponentScan(basePackages = {"works.hop.webjar.sample.service"}
    public class SampleAppConfig {}

3. Create a properties file and place in the classpath
    
    /src/main/resources/sample-service.properties
    service.message=Hello World

4. Inject the 'SampleService and add a 'helloService()' endpoint

    @Inject
    private SampleService service;
    
    ....

    @GET
    @Path("service")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response helloService(){
        LOG.info("invoked 'helloService' method");
        String message = service.getMessage();
        return Response.ok(new Item(1l, message)).build();
    }

5. Add a system property to link your DI context to the existing application

    public static void main(String[] args){
        //add system property -Dcontext.lookup=works.hop.webjar.sample.config.SampleAppConfig;
        System.setProperty("context.lookup", "works.hop.webjar.sample.config.SampleAppConfig");
        AbstractRunner.init().create(args, SampleWebApp.class);
    }

6. Restart the server

7. Open browser and navigate to "http://localhost:8082/foo/sample/service"

Notes: 

1. @Service is a spring stereotype annotation
2. @Inject is only required to inject spring beans in the resource because Jersey controls the lifecycle of the Resource classes

Example 8: Leveraging an existing application service (BasicsService) in the application resource

1. Inject 'BasicsService' to the application resource

    @Inject
    private BasicsService basics;

2. Add an endpoint to handle the request

    GET
    @Path("/user/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response fetchUserById(@PathParam("id") long id) {
        LOG.info("executing 'fetchUserById'");
        Map<String, Object> context = new HashMap<>();
        context.put("user", basics.findAccount(id).getEntity());
        return Response.ok(context).build();
    }

3. Restart the server

4. Open browser and navigate to "http://localhost:8082/foo/sample/user/1"

Notes:

1. BasicsService already exists and is wired up to work with the DAO component is this is enabled (using the "app.jdbc.configure" property in the app-config.properties file. The default value is 'false')
2. More on setting up the application for the first time will follow soon

Example 9: Leveraging an existing application service (BasicsService) in your own service

1. Create an AppServices service (with an optional interface)

    public interface AppServices {

        Provider<BasicsService> getBasicsService();

        void setBasicsService(Provider<BasicsService> basicsService);
    }

    @Service
    @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
    public class AppServicesImpl implements AppServices {

        @Autowired
        private Provider<BasicsService> basicsService;

        @Override
        public Provider<BasicsService> getBasicsService() {
            return basicsService;
        }

        @Override
        public void setBasicsService(Provider<BasicsService> basicsService) {
            this.basicsService = basicsService;
        }
    }

2. Inject the 'AppServices and add an endpoint to fetch existing blogs (if any)

    @Inject
    private AppServices services;
    
    ....

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

3. Restart the server

4. Open browser and navigate to "http://localhost:8082/foo/sample/blogs"

Notes: 

1. There is no explicit need to use the Provider<> interface as used in this example. This is done here just for the heck of it
2. If the DAO component is not enabled, this request will generate an exception. Worry not. More on that is coming soon.

