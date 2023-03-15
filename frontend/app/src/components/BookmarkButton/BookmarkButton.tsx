import HTTP from '../../utils/http';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { BookmarkType } from '../../utils/helpers';
import { Button } from '@mui/material';
import { useState } from 'react';
interface BookmarkProps {

    type: BookmarkType;
    
    itemId: string

    isBookmarked: boolean
}

const BookmarkButton:React.FunctionComponent<BookmarkProps> = ({ type, itemId, isBookmarked }) => {
    const [bookmarkState, setBookmarkState] = useState(isBookmarked)
    
    const handleBookmark = async () => {
        try{
           const result = await HTTP.post('/bookmarks', {type, itemId})
           if(result.status < 400) setBookmarkState(!bookmarkState)
        }
        catch(e){
            console.log(e)
        }
    }
    let icon;
    if(bookmarkState){
        icon = <BookmarkIcon fontSize='large'/>
        // return <Button onClick={handleBookmark} startIcon={<BookmarkIcon/>}/>
    }
    else{
        icon = <BookmarkBorderIcon fontSize='large'/>
    }
    return (
        <div>
            <Button onClick={handleBookmark} startIcon={icon}/>
        </div>
    )

}

export default BookmarkButton