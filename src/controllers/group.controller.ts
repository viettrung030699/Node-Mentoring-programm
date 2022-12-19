import { Op } from 'sequelize';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { Group, User, UserGroup } from '../models';
import { GroupInterface, UserInterface } from '../interfaces';

export const getGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const group = await Group.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!group) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);
    }

    res.status(StatusCodes.OK).send(group);
  } catch (error: any) {
    next(error);
  }
};

export const getAllGroups = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const groups = await Group.findAll();
    res.status(StatusCodes.OK).send({ groups: groups });
  } catch (error: any) {
    next(error);
  }
};

export const createGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id, name, permission } = req.body;
    const availableGroup: GroupInterface = await Group.findOne({
      where: { id },
    });

    if (availableGroup) {
      res.status(StatusCodes.OK).send('Group Exist!');
    }

    const newGroup: GroupInterface = await Group.create({
      id,
      name,
      permission,
    });

    if (!newGroup) {
      res.status(StatusCodes.BAD_REQUEST).send('Unable to create new Group');
    }

    res.status(StatusCodes.OK).send({
      message: `Create Successed ${newGroup.id} - ${newGroup.name}.`,
    });
  } catch (error: any) {
    next(error);
  }
};

export const updateGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    await Group.update({ name, permissions }, { where: { id: id } })
      .then((success: number) => {
        return success
          ? res
              .status(StatusCodes.OK)
              .send({ message: `Group${id} updated successfully!` })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .send({ error: success, Message: ReasonPhrases.BAD_REQUEST });
      })
      .catch((error: any) => {
        throw new Error(error.message);
      });
  } catch (error: any) {
    next(error);
  }
};

export const deleteGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    await UserGroup.destroy({ where: { GroupId: id } }).then(async () => {
      await Group.destroy({ where: { id } }).then((success: number) => {
        return success
          ? res
              .status(StatusCodes.OK)
              .send({ message: `Group${id} deleted successfully!` })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .send({ error: success, Message: ReasonPhrases.BAD_REQUEST });
      });
    });
  } catch (error: any) {
    next(error);
  }
};

export const addUsersToGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userIds, groupId } = req.body;

    const group = await Group.findOne({ where: { id: groupId } });
    const users = await User.findAll(
      { where: { id: { [Op.in]: userIds } } },
      { atattributes: ['id', 'login', 'password', 'age', 'isDeleted'] },
    );

    if (!group || !users)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(ReasonPhrases.BAD_REQUEST);

    users.forEach(async (user: UserInterface) => {
      await UserGroup.create({ UserId: user.id, GroupId: groupId });
    });

    res.status(StatusCodes.CREATED).send({
      message: ReasonPhrases.CREATED,
    });
  } catch (error: any) {
    next(error);
  }
};
