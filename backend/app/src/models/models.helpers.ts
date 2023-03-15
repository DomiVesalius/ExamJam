import { ICourseModel } from './courses/course.model';
import { IPostModel } from './posts/post.model';
import { IExamModel } from './exams/exam.model';

/**
 * This function will call a schema instance method on all documents of the given type
 * which will then set a virtual boolean field called isBookmarked that indicates
 * whether the user with the given email has the document bookmarked
 * @param email the email of user for which these documents are being updated
 * @param documents a list of documents to check if they have been bookmarked by the user with the
 * given email
 */
export async function setIsBookmarkedField(
    email: string,
    documents: Array<ICourseModel | IExamModel | IPostModel>
) {
    for (const doc of documents) {
        // @ts-ignore sorry typescript gods :(
        await doc.setIsBookmarked(email);
    }
}
