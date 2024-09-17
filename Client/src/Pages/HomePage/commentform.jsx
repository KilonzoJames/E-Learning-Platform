import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function CommentForm() {
  const [commentText, setCommentText] = useState('');
  const [replyTexts, setReplyTexts] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('https://class-schedule-pp4h.onrender.com/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (commentText.trim() === '') {
      return;
    }

    try {
      const response = await fetch('https://class-schedule-pp4h.onrender.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: commentText }),
      });

      if (response.status === 201) {
        console.log('Comment submitted successfully');
        fetchComments();
      } else {
        console.error('Failed to create comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
    setCommentText('');
  };

  const handleSubmitReply = async (e, comment) => {
    e.preventDefault();

    const parentId = comment.id;

    if (replyTexts[parentId] && replyTexts[parentId].trim() === '') {
      return;
    }

    try {
      const response = await fetch('https://class-schedule-pp4h.onrender.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment: replyTexts[parentId], parentId }),
      });

      if (response.status === 201) {
        console.log('Reply submitted successfully');
        fetchComments();
      } else {
        console.error('Failed to create reply:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating reply:', error);
    }
    setReplyTexts({ ...replyTexts, [parentId]: '' });
  };

  const handleLike = async (comment_id, currentLikes) => {
    try {
      const response = await fetch(`https://class-schedule-pp4h.onrender.com/comments/${comment_id}/like`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Comment liked successfully');
        fetchComments();
      } else {
        console.error('Failed to like comment:', response.statusText);
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '16px', margin: '16px', maxWidth: 600, boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)' }}>
        <h2>Write a Comment</h2>
        <form onSubmit={(e) => handleSubmitComment(e)}>
          <TextField
            fullWidth
            label="Add a comment"
            variant="outlined"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: 8 }}>
            Submit
          </Button>
        </form>
      </Paper>
      <Divider style={{ width: '100%', margin: '16px 0' }} />
      <h2 style={{ margin: '16px 0' }}>Comments</h2>
      <List>
        {Array.isArray(comments) &&
          comments.map((comment) => (
            <div key={comment.id}>
              <ListItem alignItems="flex-start">
                <ListItemText primary={comment.comment} />
                <Button onClick={() => handleLike(comment.id, comment.likes)} color="primary">
                  <ThumbUpIcon />
                  {comment.likes}
                </Button>
              </ListItem>
              {/* Reply Form */}
              <form onSubmit={(e) => handleSubmitReply(e, comment)}>
                <TextField
                  fullWidth
                  label="Reply to this comment"
                  variant="outlined"
                  value={replyTexts[comment.id] || ''}
                  onChange={(e) => setReplyTexts({ ...replyTexts, [comment.id]: e.target.value })}
                  style={{ marginLeft: '16px', marginBottom: '8px' }}
                />
                <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '16px', marginBottom: '16px' }}>
                  Reply
                </Button>
              </form>
              {comment.replies && comment.replies.map((reply) => (
                <ListItem key={reply.id} alignItems="flex-start" style={{ paddingLeft: '32px' }}>
                  <ListItemText primary={reply.comment} />
                  <Button onClick={() => handleLike(reply.id, reply.likes)} color="primary">
                    <ThumbUpIcon />
                    {reply.likes}
                  </Button>
                </ListItem>
              ))}
            </div>
          ))}
      </List>
    </div>
  );
}

export default CommentForm;