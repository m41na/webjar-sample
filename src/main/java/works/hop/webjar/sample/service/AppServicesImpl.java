package works.hop.webjar.sample.service;

import javax.inject.Provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.jarredweb.webjar.service.api.BasicsService;

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
