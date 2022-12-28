import request from 'supertest';
import {
  ERROR_400_USERS_NOT_FOUND,
  ERROR_400_USER_EXISTED,
  ERROR_400_USER_NOT_FOUND,
} from '../constants';
import { app } from '../server';
import { UserService } from '../services';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXI5OSIsInBhc3N3b3JkIjoiJDJiJDEwJHRQTHZab1Z0L2tRWFVhZmpua0FKMC5PLmVaWHd0ak50TXRoWjR4QUw4cUtpY2hRV1EwNE5hIiwiaWF0IjoxNjcyMTQ3MjEyfQ.VM1vsSnw7EZbVR3OUBrzm-2haPzHpIF6o8CNuN53-dg';

  describe('Test User create route', () => {
  const newUser = {
    id: '34',
    login: 'user34',
    password: 'Trungser123',
    age: 30,
    isDeleted: false,
  };
  
  test('should have status and new user response', async () => {
    const expectedStatusCode = 200;
    const mockCreateUser = jest.fn((): any => newUser);

    jest
      .spyOn(UserService, 'createUser')
      .mockImplementation(() => mockCreateUser());

    const res = await request(app).post('/api/v1/users/create').send(newUser).set('Authorization', 'Bearer ' + accessToken);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('newUser');
    expect(res.status).toBe(expectedStatusCode);
  });

  test('Should handle exception', async () => {
    const expectedStatusCode = 400;
    const expectedMessage = 'User Existed';
    const mockCreateUser = jest.fn((): any => {
      throw new Error(ERROR_400_USER_EXISTED);
    });
    jest
      .spyOn(UserService, 'createUser')
      .mockImplementation(() => mockCreateUser());

    const res = await request(app).post('/api/v1/users/create').send({
      id: '22',
      login: 'user22',
      password: 'Trungser123',
      age: 50,
      isDeleted: false,
    }).set('Authorization', 'Bearer ' + accessToken);
    expect(mockCreateUser).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      message: expectedMessage,
      status: expectedStatusCode,
    });
  });
});

describe('Test User get route', () => {
  const user = {
    id: '34',
    login: 'user34',
    password: 'Trungser123',
    age: 30,
    isDeleted: false,
  };
  describe('Get All User', () => {
    test('should have status and all users response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully retrieved all users';
      const mockGetAllUsers = jest.fn((): any => [user]);

      jest
        .spyOn(UserService, 'getAllUsers')
        .mockImplementation(() => mockGetAllUsers());

      const res = await request(app).get('/api/v1/users/getAllUsers').set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
        users: [user],
      });
      expect(res.status).toBe(expectedStatusCode);
    });

    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = 'Users Not Found';
      const mockGetAllUsers = jest.fn((): any => {
        throw new Error(ERROR_400_USERS_NOT_FOUND);
      });

      jest
        .spyOn(UserService, 'getAllUsers')
        .mockImplementation(() => mockGetAllUsers());

      const res = await request(app).get('/api/v1/users/getAllUsers').set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        message: expectedMessage,
        status: expectedStatusCode,
      });
    });
  });
  describe('Get User By Id', () => {
    test('should have status and target user response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully retrieved user';
      const mockGetUsersById = jest.fn((id): any => user);

      jest
        .spyOn(UserService, 'getUserById')
        .mockImplementation(() => mockGetUsersById(user.id));

      const res = await request(app).get('/api/v1/users/:id').set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetUsersById).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
        user: user,
      });
      expect(res.status).toBe(expectedStatusCode);
    });
    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = 'User Not Found';
      const mockGetUsersById = jest.fn((id): any => {
        throw new Error(ERROR_400_USER_NOT_FOUND);
      });

      jest
        .spyOn(UserService, 'getUserById')
        .mockImplementation(() => mockGetUsersById(user.id));

      const res = await request(app).get(`/api/v1/users/${user.id}`).set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetUsersById).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        message: expectedMessage,
        status: expectedStatusCode,
      });
    });
  });
});

describe('Test User update route', () => {
  describe('Update User By Id', () => {
    const updatedUser = {
      id: '34',
      login: 'user34',
      password: 'Trungser123',
      age: 29,
      isDeleted: false,
    };

    test('should have status and target user response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully updated user';

      const mockUpdateUser = jest.fn((id, userInfo): any => updatedUser);

      jest
        .spyOn(UserService, 'updateUser')
        .mockImplementation(() => mockUpdateUser('34', updatedUser));

      const res = await request(app).put('/api/v1/users/:id').send(updatedUser).set('Authorization', 'Bearer ' + accessToken);

      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
        updatedUser: updatedUser,
      });
      expect(res.status).toBe(expectedStatusCode);
    });

    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = 'User Not Found';
      const mockUpdateUser = jest.fn((id, userInfo): any => {
        throw new Error(ERROR_400_USER_NOT_FOUND);
      });

      jest
        .spyOn(UserService, 'updateUser')
        .mockImplementation(() => mockUpdateUser('34', updatedUser));

      const res = await request(app).put('/api/v1/users/:id').send(updatedUser).set('Authorization', 'Bearer ' + accessToken);

      expect(mockUpdateUser).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        message: expectedMessage,
        status: expectedStatusCode,
      });
    });
  });
});

describe('Test User delete route', () => {
  describe('Delete User by Id', () => {
    test('should have status and delete response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully deleted user';

      const mockUserId = '8';
      const mockDeleteUser = jest.fn((id): any => {});

      jest
        .spyOn(UserService, 'deleteUser')
        .mockImplementation(() => mockDeleteUser(mockUserId));

      const res = await request(app).delete(`/api/v1/users/${mockUserId}`).set('Authorization', 'Bearer ' + accessToken);

      expect(mockDeleteUser).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
      });
      expect(res.status).toBe(expectedStatusCode);
    });
    // test('should handle exception', async () => {
    //   const expectedStatusCode = 400;
    //   const mockUserId = '34';
    //   const expectedMessage = `User ${mockUserId} does not exist`;

    //   const mockDeleteUser = jest.fn((id): any => {});

    //   jest
    //     .spyOn(UserService, 'deleteUser')
    //     .mockImplementation(() => mockDeleteUser(mockUserId));

    //   const res = await request(app).delete(`/api/v1/users/${mockUserId}`);

    //   expect(mockDeleteUser).toHaveBeenCalledTimes(1);
    //   expect(res.body).toEqual({
    //     message: expectedMessage,
    //     status: expectedStatusCode,
    //   });
    // });
  });
});
