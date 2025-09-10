import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
      await prisma.$queryRaw`SELECT 1`
      
      const quizzes = await prisma.quiz.findMany()
      console.log('Quizzes found:', quizzes.length)
      
      return NextResponse.json(quizzes)
    } catch (error) {
      console.error("Full error:", error)
      const code = (error as any)?.code
      const meta = (error as any)?.meta
      const message = (error as any)?.message
      console.error("Prisma error code:", code)
      console.error("Meta:", meta)
      
      return NextResponse.json(
        { 
          error: "Database operation failed",
          details: message,
          code,
          meta
        },
        { status: 500 }
      )
    }
  }


    // return NextResponse.json({hello: "world"});
