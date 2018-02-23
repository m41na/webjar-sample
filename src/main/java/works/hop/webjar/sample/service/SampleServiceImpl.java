package works.hop.webjar.sample.service;

import org.jvnet.hk2.annotations.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class SampleServiceImpl implements SampleService {

    @Value("${service.message}")
    private String message;

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public void setMessage(String message) {
        this.message = message;
    }
}
