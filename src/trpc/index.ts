import { db } from "@/db";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";

export const appRouter = router({
  register: publicProcedure
    .input(z.object({
      username: z.string(),
      password: z.string()
    }))
    .mutation(async ({input}) => {
      const {username,password} = input
      const exist = await db.user.findUnique({
        where: {username: username}
      })
      if(exist) throw new TRPCError({code: 'BAD_REQUEST'})
      const hashedPassword = await bcrypt.hash(password,10)
      const user = await db.user.create({
        data: {
          username: username,
          password: hashedPassword
        }
      })

      return {user}
  }),

  //Lucky Spinner
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
        used: z.boolean(),
        price: z.string()
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
        used: z.boolean(),
        price: z.string()
      }),
    )
    .mutation(async ({ input }) => {
      const data = { ...input };
      const saveData = await db.luckySpiner.update({
        where: { id: data.id },
        data: { ...input },
      });
      return { saveData };
    }),

  // Misteri Box
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
        used: z.boolean(),
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
        used: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = { ...input };
      const saveData = await db.misteribox.update({
        where: { id: data.id },
        data: { ...input },
      });
      return { saveData };
    }),

  //Lucky Spiner Option
  getLuckySpinerOptionList: privateProcedure
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
        db.luckySpinerOption.findMany({
          where: {
            OR: [
              { option: { contains: search, mode: "insensitive" } },
              { color: { contains: search, mode: "insensitive" } },
            ],
          },
          skip: skip,
          take: 10,
        }),
        db.luckySpinerOption.count({
          where: {
            OR: [
              { option: { contains: search, mode: "insensitive" } },
              { color: { contains: search, mode: "insensitive" } },
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
  createLuckySpinerOption: privateProcedure
    .input(
      z.object({
        option: z.string(),
        color: z.string(),
        probability: z.number(),
        forceWin: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      
      if(input.forceWin){
        const saveData = await db.$transaction([
          db.luckySpinerOption.updateMany({
            where:{forceWin: true},
            data: {forceWin: false}
          }),
          db.luckySpinerOption.create({
            data: { ...input },
          })
        ])
        return { saveData: saveData[1] };
      }else{
        const saveData = await db.luckySpinerOption.create({
          data: { ...input },
        })
        
        return { saveData };
      }
    }),
  deleteLuckySpinerOption: privateProcedure
    .input(z.object({ listId: z.array(z.string()) }))
    .mutation(async ({ input }) => {
      const { listId } = input;
      const deleteCount = await db.luckySpinerOption.deleteMany({
        where: {
          id: { in: listId },
        },
      });
      return { deleteCount };
    }),
  updateLuckySpinerOption: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        option: z.string(),
        color: z.string(),
        probability: z.number(),
        forceWin: z.boolean(),
      }),
    )
    .mutation(async ({ input }) => {
      const data = { ...input }
      if(data.forceWin){
        const saveData = await db.$transaction([
          db.luckySpinerOption.updateMany({
            where:{forceWin: true},
            data: {forceWin: false}
          }),
          db.luckySpinerOption.update({
            where: { id: data.id },
            data: { ...input },
          })
        ])
        return { saveData: saveData[1] };
      }else{
        const saveData = await db.luckySpinerOption.update({
          where: { id: data.id },
          data: { ...input },
        });
        
        return { saveData };
      }
    }),

  checkCoupon: publicProcedure.input(z.object({memberId: z.string(),codeVoucher: z.string()})).mutation(async ({input}) => {
    const data = {...input}
    const getData = await db.luckySpiner.findFirst({where: {
      memberId: data.memberId,
      codeVoucher: data.codeVoucher,
      used: false
    }})
    if(getData?.canExpired && getData.expiredDate && getData.expiredDate < new Date()){
      return {getData: null}
    }
    return {getData}
  }),

  updateCoupon: publicProcedure.input(z.object({id: z.string(),price: z.string()})).mutation(async ({input}) => {
    const saveData = await db.luckySpiner.update({where: {
      id: input.id
    },
    data: {
      price: input.price,
      used: true
    }
  })
  return {saveData}
  })
});

export type AppRouter = typeof appRouter;
