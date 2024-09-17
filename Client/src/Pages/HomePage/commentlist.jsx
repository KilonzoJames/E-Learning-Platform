// Create a component to list course comments. Each announcement can include the title, content, and date.
import { Card, CardContent, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";

const CommentList = ({ comments, setComment}) => {

  const deleteAnnouncement = (selectedAnnouncement) => {
    const announcementId = selectedAnnouncement.id;

    fetch(`http://127.0.0.1:5555/announce/${announcementId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          const deletedAnnouncementDiv = document.querySelector(`#transaction-${announcementId}`);
          if (deletedAnnouncementDiv) {
            deletedAnnouncementDiv.remove();
          } else {
            console.warn(`Announcement div with ID ${announcementId} not found.`);
          }
          setComment(comments.filter((announcement) => announcement.id !== announcementId));
        } else {
          return response.json().then((errorData) => {
            throw new Error(`Error deleting announcement: ${response.status}. Error message: ${errorData.message}`);
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
      <Grid container spacing={2}>
        {comments.map((announcement) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={announcement.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Title </Typography>
                <Typography variant="body1">
                  {announcement.name}
                </Typography>
                <Typography variant="h6">Announcement </Typography>
                <Typography variant="body1">
                  {announcement.comments}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    deleteAnnouncement(announcement);
                    console.log(announcement.id);}}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CommentList;