import request from 'supertest';
import {
  ERROR_400_GROUPS_NOT_FOUND,
  ERROR_400_GROUP_EXISTED,
  ERROR_400_GROUP_NOT_FOUND,
} from '../constants';
import { app } from '../server';
import { GroupService } from '../services';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InVzZXI5OSIsInBhc3N3b3JkIjoiJDJiJDEwJHRQTHZab1Z0L2tRWFVhZmpua0FKMC5PLmVaWHd0ak50TXRoWjR4QUw4cUtpY2hRV1EwNE5hIiwiaWF0IjoxNjcyMTQ3MjEyfQ.VM1vsSnw7EZbVR3OUBrzm-2haPzHpIF6o8CNuN53-dg';

describe('Test Group create route', () => {
  const newGroup = {
    id: '10',
    name: 'Test Group',
    permission: ['READ', 'WRITE'],
  };

  test('should have status and new GROUP response', async () => {
    const expectedStatusCode = 200;
    const mockCreateGroup = jest.fn((): any => newGroup);

    jest
      .spyOn(GroupService, 'createGroup')
      .mockImplementation(() => mockCreateGroup());

    const res = await request(app)
      .post('/api/v1/groups/create')
      .send(newGroup)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(mockCreateGroup).toHaveBeenCalledTimes(1);
    expect(res.body).toHaveProperty('msg');
    expect(res.body).toHaveProperty('newGroup');
    expect(res.status).toBe(expectedStatusCode);
  });

  test('Should handle exception', async () => {
    const expectedStatusCode = 400;
    const expectedMessage = 'Group Existed';
    const mockCreateGroup = jest.fn((): any => {
      throw new Error(ERROR_400_GROUP_EXISTED);
    });
    jest
      .spyOn(GroupService, 'createGroup')
      .mockImplementation(() => mockCreateGroup());

    const res = await request(app)
      .post('/api/v1/groups/create')
      .send({
        id: '5',
        name: 'Other',
        permission: ['READ'],
      })
      .set('Authorization', 'Bearer ' + accessToken);
    expect(mockCreateGroup).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({
      message: expectedMessage,
      status: expectedStatusCode,
    });
  });
});

describe('Test Group get route', () => {
  const group = {
    id: '10',
    name: 'Test Group',
    permission: ['READ', 'WRITE'],
  };

  describe('Get All Group', () => {
    test('should have status and all users response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully retrieved all groups';
      const mockGetAllGroups = jest.fn((): any => [group]);

      jest
        .spyOn(GroupService, 'getAllGroups')
        .mockImplementation(() => mockGetAllGroups());

      const res = await request(app)
        .get('/api/v1/groups/getAllGroups')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetAllGroups).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
        groups: [group],
      });
      expect(res.status).toBe(expectedStatusCode);
    });

    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = 'Groups Not Found';
      const mockGetAllGroups = jest.fn((): any => {
        throw new Error(ERROR_400_GROUPS_NOT_FOUND);
      });

      jest
        .spyOn(GroupService, 'getAllGroups')
        .mockImplementation(() => mockGetAllGroups());

      const res = await request(app)
        .get('/api/v1/groups/getAllGroups')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetAllGroups).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        message: expectedMessage,
        status: expectedStatusCode,
      });
    });
  });
  describe('Get Group By Id', () => {
    test('should have status and target user response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully retrieved group';
      const mockGetGroupById = jest.fn((id): any => group);

      jest
        .spyOn(GroupService, 'getGroupById')
        .mockImplementation(() => mockGetGroupById(group.id));

      const res = await request(app)
        .get('/api/v1/groups/:id')
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetGroupById).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
        group: group,
      });
      expect(res.status).toBe(expectedStatusCode);
    });
    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = 'Group Not Found';
      const mockGetGroupById = jest.fn((id): any => {
        throw new Error(ERROR_400_GROUP_NOT_FOUND);
      });

      jest
        .spyOn(GroupService, 'getGroupById')
        .mockImplementation(() => mockGetGroupById(group.id));

      const res = await request(app)
        .get(`/api/v1/groups/${group.id}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockGetGroupById).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        message: expectedMessage,
        status: expectedStatusCode,
      });
    });
  });
});

describe('Test Group update route', () => {
  describe('Update Group By Id', () => {
    const updatedGroup = {
      id: '3',
      name: 'Lecturers',
      permission: ['READ', 'WRITE', 'UPLOAD_FILES'],
    };

    test('should have status and target group response', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = 'Successfully updated group';

      const mockUpdateGroup = jest.fn((id, groupInfo): any => updatedGroup);

      jest
        .spyOn(GroupService, 'updateGroup')
        .mockImplementation(() => mockUpdateGroup('3', updatedGroup));

      const res = await request(app)
        .put(`/api/v1/groups/${updatedGroup.id}}`)
        .send(updatedGroup)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockUpdateGroup).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
        updatedGroup: updatedGroup,
      });
      expect(res.status).toBe(expectedStatusCode);
    });

    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = 'Group Not Found';
      const mockUpdateGroup = jest.fn((id, groupInfo): any => {
        throw new Error(ERROR_400_GROUP_NOT_FOUND);
      });

      jest
        .spyOn(GroupService, 'updateGroup')
        .mockImplementation(() => mockUpdateGroup('34', updatedGroup));

      const res = await request(app)
        .put('/api/v1/groups/34')
        .send(updatedGroup)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockUpdateGroup).toHaveBeenCalledTimes(1);
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
      const expectedMessage = 'Group deleted successfully';

      const mockGroupId = '1';
      const mockDeleteGroup = jest.fn((id): any => {});

      jest
        .spyOn(GroupService, 'deleteGroupById')
        .mockImplementation(() => mockDeleteGroup(mockGroupId));

      const res = await request(app)
        .delete(`/api/v1/groups/${mockGroupId}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockDeleteGroup).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        msg: expectedMessage,
      });
      expect(res.status).toBe(expectedStatusCode);
    });

    test('should handle exception', async () => {
      const expectedStatusCode = 400;
      const mockGroupId = '34';
      const expectedMessage = 'Group Not Found';

      const mockDeleteGroup = jest.fn((mockGroupId): any => {
        throw new Error(ERROR_400_GROUP_NOT_FOUND);
      });

      jest
        .spyOn(GroupService, 'deleteGroupById')
        .mockImplementation(() => mockDeleteGroup(mockGroupId));

      const res = await request(app)
        .delete(`/api/v1/groups/${mockGroupId}`)
        .set('Authorization', 'Bearer ' + accessToken);

      expect(mockDeleteGroup).toHaveBeenCalledTimes(1);
      expect(res.body).toEqual({
        message: expectedMessage,
        status: expectedStatusCode,
      });
    });
  });
});
