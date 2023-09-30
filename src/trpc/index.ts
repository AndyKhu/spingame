import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const appRouter = router({
  // register: publicProcedure
  //   .input(z.object({
  //     username: z.string(),
  //     password: z.string()
  //   }))
  //   .mutation(async ({input}) => {
  //     const {username,password} = input
  //     const exist = await db.user.findUnique({
  //       where: {username: username}
  //     })
  //     if(exist) throw new TRPCError({code: 'BAD_REQUEST'})
  //     const hashedPassword = await bcrypt.hash(password,10)
  //     const user = await db.user.create({
  //       data: {
  //         username: username,
  //         password: hashedPassword
  //       }
  //     })

  //     return {user}
  //   }),
  getLuckySpinerList: privateProcedure
    .input(
      z.object({
        skip: z.number(),
        search: z.string(),
        type: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { skip, search, type } = input;
      const listsData = await db.$transaction([
        db.luckySpiner.findMany({
          where: {
            OR: [
              { memberId: { contains: search, mode: "insensitive" } },
              { codeVoucher: { contains: search, mode: "insensitive" } },
            ],
          },
          skip: skip,
          take: 10,
        }),
        db.luckySpiner.count({
          where: {
            OR: [
              { memberId: { contains: search, mode: "insensitive" } },
              { codeVoucher: { contains: search, mode: "insensitive" } },
            ],
          },
        }),
      ]);
      const totalPage = Math.floor((listsData[1] + 10 - 1) / 10);
      return {
        Lists: listsData[0],
        count: listsData[1],
        totalPage: totalPage,
        type: type,
      };
    }),
  createLuckySpiner: privateProcedure
    .input(
      z.object({
        memberId: z.string().min(1, { message: "username required" }),
        codeVoucher: z.string().min(1, { message: "code voucher required" }),
        canExpired: z.boolean(),
        expiredDate: z.any().optional(),
        expired: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const saveData = await db.luckySpiner.create({
        data: { ...input },
      });
      return { saveData };
    }),
  deleteLuckySpiner: privateProcedure
    .input(z.object({ listId: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const { listId } = input;
      const deleteCount = await db.luckySpiner.deleteMany({
        where: {
          id: { in: listId },
        },
      });
      return { deleteCount };
    }),
  updateLuckySpiner: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        memberId: z.string().min(1, { message: "username required" }),
        codeVoucher: z.string().min(1, { message: "code voucher required" }),
        canExpired: z.boolean(),
        expiredDate: z.any().optional(),
        expired: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = {...input}
      const saveData = await db.luckySpiner.update({
        where: {id: data.id},
        data: { ...input },
      });
      return { saveData };
    }),

    getMisteriboxLists: privateProcedure
    .input(
      z.object({
        skip: z.number(),
        search: z.string(),
        type: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { skip, search, type } = input;
      const listsData = await db.$transaction([
        db.misteribox.findMany({
          where: {
            OR: [
              { memberId: { contains: search, mode: "insensitive" } },
              { codeVoucher: { contains: search, mode: "insensitive" } },
            ],
          },
          skip: skip,
          take: 10,
        }),
        db.misteribox.count({
          where: {
            OR: [
              { memberId: { contains: search, mode: "insensitive" } },
              { codeVoucher: { contains: search, mode: "insensitive" } },
            ],
          },
        }),
      ]);
      const totalPage = Math.floor((listsData[1] + 10 - 1) / 10);
      return {
        Lists: listsData[0],
        count: listsData[1],
        totalPage: totalPage,
        type: type,
      };
    }),
  createMisteribox: privateProcedure
    .input(
      z.object({
        memberId: z.string().min(1, { message: "username required" }),
        codeVoucher: z.string().min(1, { message: "code voucher required" }),
        canExpired: z.boolean(),
        expiredDate: z.any().optional(),
        expired: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const saveData = await db.misteribox.create({
        data: { ...input },
      });
      return { saveData };
    }),
  deleteMisteribox: privateProcedure
    .input(z.object({ listId: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const { listId } = input;
      const deleteCount = await db.misteribox.deleteMany({
        where: {
          id: { in: listId },
        },
      });
      return { deleteCount };
    }),
  updateMisteribox: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        memberId: z.string().min(1, { message: "username required" }),
        codeVoucher: z.string().min(1, { message: "code voucher required" }),
        canExpired: z.boolean(),
        expiredDate: z.any().optional(),
        expired: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = {...input}
      const saveData = await db.misteribox.update({
        where: {id: data.id},
        data: { ...input },
      });
      return { saveData };
    }),
});

export type AppRouter = typeof appRouter;
