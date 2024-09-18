// Create a component to list course comments. Each announcement can include the title, content, and date.
import { Card, CardContent, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

const CommentList = ({ comments, setComment }) => {
  const deleteAnnouncement = (selectedAnnouncement) => {
    const announcementId = selectedAnnouncement.id;

    fetch(`/api/comments/${announcementId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          const deletedAnnouncementDiv = document.querySelector(
            `#transaction-${announcementId}`
          );
          if (deletedAnnouncementDiv) {
            deletedAnnouncementDiv.remove();
          } else {
            console.warn(
              `Announcement div with ID ${announcementId} not found.`
            );
          }
          setComment(
            comments.filter(
              (announcement) => announcement.id !== announcementId
            )
          );
        } else {
          return response.json().then((errorData) => {
            throw new Error(
              `Error deleting announcement: ${response.status}. Error message: ${errorData.message}`
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display the error message to the user or handle it as needed
        // For example: setAnnouncementError(errorMessage);
      });
  };

  return (
    <div>
      {comments ? (
        <Grid container spacing={2}>
          {comments.map((comment) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={comment.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Title </Typography>
                  <Typography variant="body1">{comment.created_at}</Typography>
                  <Typography variant="h6">Announcement </Typography>
                  <Typography variant="body1">
                    {comment.content}
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      deleteAnnouncement(comment);
                      console.log(comment.id);
                    }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>All Comments</div>
      )}
    </div>
  );
};

export default CommentList;
CommentList.propTypes = {
  comments: PropTypes.array.isRequired, // Define the expected type for comments
  setComment: PropTypes.func.isRequired, // Define the expected type for setComment
};
