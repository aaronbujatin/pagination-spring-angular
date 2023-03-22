package com.aaronbujatin.pagination.junior.service;

import com.aaronbujatin.pagination.junior.domain.User;
import org.springframework.data.domain.Page;

public interface UserService {

    Page<User> getUsers(String name, int page, int size); //getting the user with its name, pageNumber and size of elements ex. 10 user
}
