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
