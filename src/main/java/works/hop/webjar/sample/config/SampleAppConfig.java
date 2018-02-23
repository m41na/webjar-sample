package works.hop.webjar.sample.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource({"classpath:sample-service.properties"})
@ComponentScan(basePackages = {"works.hop.webjar.sample.service"})
public class SampleAppConfig{}
