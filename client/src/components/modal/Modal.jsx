import { Fragment, useState } from "react";
import {
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Button,
  Rating,
  Spinner,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

export default function Modal({ handler }) {
  const [rated, setRated] = useState(1);
  const [open, setOpen] = useState(true);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState(false);

  const handleInput = (e) => {
    setComment(e.target.value)
    if (e.target.value) {
      setInputError(false);
    }
  }

  const handleSubmit = async (e) => {
    if (!comment) {
      toast("Please write your comment!",
        {
          icon: '⚠️'
        });
      setInputError(true);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(APP_SERVER + '/api/user/feedback', {
        rating: rated,
        comment
      }, {
        headers: {
          Authorization: "Bearer " + Cookies.get('token')
        }
      });
      console.log(response.data.message);
      if (response.status === 201) {
        setLoading(false);
        handler("success");
      }
    } catch (error) {
      console.error('Error submitting feedback', error);
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <DialogHeader>Feedback</DialogHeader>
      <DialogBody divider >
        <form className="mb-2  max-w-screen-lg ">
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
              Please share your thoughts or any features you would like to see.
            </p>
            <Textarea variant="outlined" label="Comment"
              value={comment}
              onChange={(e) => handleInput(e)}
              error={inputError}
            />
          </div>
        </form>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="gray"
          onClick={handler}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button className="" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner color="white" className="h-4 w-4" /> : "Submit"}
        </Button>
      </DialogFooter>
    </>
  );
}