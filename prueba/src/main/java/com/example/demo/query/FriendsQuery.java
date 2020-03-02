package com.example.demo.query;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.example.demo.dao.entity.Friends;
import com.example.demo.service.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FriendsQuery implements GraphQLQueryResolver {
    @Autowired
    private FriendsService friendsService;
    public Iterable<Friends> listFriends(String id, String fid) {
        return this.friendsService.getAllFriends(id, fid);
    }
}