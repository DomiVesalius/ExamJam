import HTTP from '../../utils/http';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { BookmarkType } from '../../utils/helpers';
import { Button } from '@mui/material';

interface BookmarkProps {

    type: BookmarkType;
    
    itemId: string

}

const BookmarkButton:React.FunctionComponent<BookmarkProps> = ({ type, itemId }) => {
    const handleBookmark = () => {
        HTTP.post('/bookmarks', {type, itemId})
    }
    return <Button onClick={handleBookmark} startIcon={<BookmarkIcon/>}/>

}

export default BookmarkButton