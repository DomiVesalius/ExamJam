import BookmarkModel, {IBookmarkModel, BookmarkType} from "./bookmark.model";
import { CoursesService } from "../courses/courses.service";
import { ExamService } from "../exams/exam.service";
import { PostsService } from "../posts/posts.service";
// import { PostService } from "tsoa";
interface ParamsInterface {
    userEmail: string;
    courseCode?: string;
    examId?: string;
    postId?: string;
    type: BookmarkType
}

export class BookmarkService{
    private static async constructParams(itemId: string, type: BookmarkType, email:string): Promise<ParamsInterface | null>{
        let parameters: ParamsInterface
        let exists 
        switch (type) {
            case BookmarkType.course:
                
                exists = await CoursesService.getByCourseId(itemId)
                if (!exists){
                    return null
                }
                parameters = {
                    userEmail: email,
                    type: type,
                    courseCode: itemId.toUpperCase(),
                }
                break;
            case BookmarkType.exam:
                exists = await ExamService.getExamById(itemId)
                if (!exists){
                    return null
                }
                parameters = {
                    userEmail: email,
                    type: type,
                    examId: itemId,
                }
                break;
            case BookmarkType.post:

                exists = await PostsService.getPost(itemId)
                if(!exists){
                    return null
                }
                parameters = {
                    userEmail: email,
                    type: type,
                    postId: itemId
                }
                break;
        }
        console.log(parameters)
        return parameters
    }
    public static async createBookmark(itemId: string, type: BookmarkType, email:string): Promise<IBookmarkModel | null>{
        const params = await this.constructParams(itemId, type, email)
        if(!params) return null;
        try{
            return await BookmarkModel.create(params);
        }
        catch(e){
            console.log("ERROR: ",e)
            return null;
        }  
    }
    public static async getBookmark(itemId: string, type: BookmarkType, email:string): Promise<IBookmarkModel|null>{
        const params = await this.constructParams(itemId, type, email)
        if(!params) return null;
        
        try{
            const val = await BookmarkModel.findOne(params);
            return val
        }
        catch(e){
            return null;
        }  
    }
    public static async deleteBookmark(bookmarkId: string): Promise<boolean>{
        // const params = this.constructParams(itemId, type, email)
        try{
            await BookmarkModel.findByIdAndDelete(bookmarkId)
            return true
        }
        catch(e){
            return false
        }

        
    }
}