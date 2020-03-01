package com.example.demo.query;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.Appears;
import com.example.demo.service.AppearsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppearsQuery implements GraphQLQueryResolver {
    @Autowired
    private AppearsService appearsService;
    public Iterable<Appears> listAppears(final String charid) {
        return this.appearsService.getAllAppears(charid);
    }
}