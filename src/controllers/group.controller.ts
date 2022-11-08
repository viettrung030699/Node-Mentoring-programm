import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Request, Response } from 'express';
import { Group } from '../models';

enum Permission {
  READ,
  WRITE,
  DELETE,
  SHARE,
  UPLOAD_FILES,
}

interface Group {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

export const getGroupById = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error(error);
  }
};

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.findAll();
    res.status(StatusCodes.OK).send({ groups: groups });
  } catch (error) {
    console.error(error);
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { id, name, permissions } = req.body;
    const availableGroup: Group = await Group.findOne({ where: { id } });

    if (availableGroup) {
      res.status(StatusCodes.OK).send('Group Exist!');
    }

    const newGroup: Group = await Group.create({
      id,
      name,
      permissions,
    });

    if (!newGroup) {
      res.status(StatusCodes.BAD_REQUEST).send('Unable to create new Group');
    }

    res.status(StatusCodes.OK).send({
      message: `Create Successed ${newGroup.id} - ${newGroup.name}.`,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const updateGroupById = async (req: Request, res: Response) => {
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
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};

export const deleteGroupById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Group.destroy({ where: { id } }).then(
      (success: number) => {
        return success
          ? res
              .status(StatusCodes.OK)
              .send({ message: `Group${id} deleted successfully!` })
          : res
              .status(StatusCodes.BAD_REQUEST)
              .send({ error: success, Message: ReasonPhrases.BAD_REQUEST });
      },
    );
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .send({ error: error.message, Message: ReasonPhrases.BAD_REQUEST });
    }
  }
};
