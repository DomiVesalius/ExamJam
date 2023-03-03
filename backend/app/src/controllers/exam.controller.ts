import {Controller, Get, Route, Query, Res, Tags, Path} from 'tsoa';
import { GridFSBucket, ObjectId, MongoClient } from 'mongodb';
import {ExamService} from "../services/exam.service";
import mongoose from "mongoose";
import * as fs from "fs";
import {TsoaResponse} from "@tsoa/runtime";
import {Response} from "express";
import http from 'http';
@Route('file')
@Tags('File')
export class FileController extends Controller {
  public async getGridFSBucket() {
    return new mongoose.mongo.GridFSBucket(mongoose.connection.db);
  }
  //
  // @Get("{courseCode}/{examId}")
  // public async getFile(@Path() courseCode: string, @Path() examId: string) {
  //   // let MongoClient = require('mongodb').MongoClient, test = require('assert');
  //   try {
  //     const exam = await ExamService.getExam(examId);
  //       if (!exam) {
  //           this.setStatus(404);
  //           return 'Exam not found';
  //       }
  //       const files_id = exam.files_id;
  //       if (!files_id) {
  //           this.setStatus(404);
  //           return 'File not found';
  //       }
  //       const bucket = await this.getGridFSBucket();
  //
  //       // const file = mongoose.connection.db.collection(fs.chunks).find({files_id: files_id}).toArray();
  //       // const file = mongoose.connection.db.collection("fs.files").find({_id: files_id}).toArray();
  //
  //       const file = (await bucket.find(files_id).toArray())[0];
  //       if (!file) {
  //         this.setStatus(404)
  //         return "File not found";
  //       }
  //       // this.setHeader('Content-Disposition', `attachment; filename=./${files_id}.pdf`);
  //       const downloadStream = bucket.openDownloadStream(file._id);
  //       // const fileStream = fs.createWriteStream(`./${files_id}.pdf`);
  //       // this.setHeader('Content-Type', 'application/pdf');
  //       // this.setHeader('Content-Length', `${file.length}`);
  //
  //       //response.send(file);
  //       // downloadStream.pipe(response);
  //       // NEW COMMIT HERE
  //     //
  //     //   downloadStream.pipe(fileStream);
  //     //   downloadStream.on('end', () => {
  //     //   fileStream.close();
  //     //   });
  //
  //     // return response;
  //   } catch (err) {
  //     this.setStatus(500);
  //     return "Internal Server Error";
  //   }
  // }
}
