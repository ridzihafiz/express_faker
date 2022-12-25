import db from "../../prisma/connection";
import { request, response } from "express";

// create user
export const user_create = async (req = request, res = response) => {
  try {
    const data = await req.body;
    const createUser = await db.users.create({
      data: data,
    });
    return res.status(201).json({
      success: true,
      data: createUser,
      message: "User successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// read user
export const user_read = async (req = request, res = response) => {
  try {
    // let page = 2;
    // let limit = 10;
    let { page = 1, limit = 10 } = req.query; // string
    let skip = (page - 1) * limit;

    const result = await db.users.findMany({
      take: parseInt(limit),
      skip: skip,
    });

    // informasi total data keseluruhan
    const resultCount = await db.users.count(); //integer jumlah total data users

    // generated total page
    const totalPage = Math.ceil(resultCount / limit);

    return res.status(200).json({
      success: true,
      currentPage: page - 0, // - 0 ubah dari String ke Int
      totalPage: totalPage,
      totalData: resultCount,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
