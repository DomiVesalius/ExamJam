import HTTP from '../../utils/http';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { BookmarkType } from '../../utils/helpers';
import { IconButton } from '@mui/material';
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
        icon = <BookmarkIcon/>
    }
    else{
        icon = <BookmarkBorderIcon/>
    }
    return (
        <IconButton onClick={handleBookmark}>
           {icon}
        </IconButton>
    )

}

export default BookmarkButton