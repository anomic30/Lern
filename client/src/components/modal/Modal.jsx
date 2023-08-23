import { Fragment, useState } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Checkbox,
  Button,
  Typography,
  Rating,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from 'js-cookie';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

export default function Modal() {
  const [rated, setRated] = useState(1);
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState('');

  const handleOpen = () => setOpen(!open);


  const handleSubmit = async (e) => {

    try {
      const response = await axios.post(APP_SERVER + '/api/user/feedback', {
        rating: rated,
        comment
      }, {
        headers: {
          Authorization: "Bearer " + Cookies.get('token')
        }
      }
      );

      console.log(response.data.message);
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  return (
    <>

      <Dialog open={open} handler={handleOpen} size={"xs"}>
        <DialogHeader>Feedback</DialogHeader>
        <DialogBody divider >

          <form className="mt-8 mb-2  max-w-screen-lg " onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <p>
                How would you rate your overall experience with our app?
              </p>
              <div className="flex gap-5">
                <Rating value={1} onChange={(value) => setRated(value)} ratedColor="amber" />
                <p>
                  {rated} / 5
                </p>
              </div>
              <p>
                Please share your thoughts about the app in a few words.
              </p>
              <Textarea variant="outlined" label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="grey"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="bg-cblack" onClick={handleSubmit} type="submit">
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}