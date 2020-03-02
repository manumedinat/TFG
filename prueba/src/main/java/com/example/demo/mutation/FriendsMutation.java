package com.example.demo.mutation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.example.demo.dao.entity.Friends;
import com.example.demo.service.*;

//import java.time.LocalDate;
@Component
public class FriendsMutation implements GraphQLMutationResolver {
    @Autowired
    private FriendsService friendsService;
    public Friends createFriends(String id, String fid) {
        return this.friendsService.createFriends(id,fid);
    }
}