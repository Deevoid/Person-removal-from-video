**Person-Removal-from-Video**

## Real time person removal from video using Tensorflow.JS and bodyPix.

###### Technologies Used
- Tensorflow.js
- BodyPIX
- Javascript
- HTML
- CSS

------------


### Working
 The video is extracted frame by frame and is projected on a temporary canvas. Then we 
use the bodyPix to convert the frame into pixels.
The pixel are then assigned **0 and 1** values where 0 refers to non Human pixels and 1 refers to the Human pixels. 
Now our job is to replace the pixel with values = 1 with the pixels from the background.

###### The final step is to put the result to the output canvas.


### NOTE:
This algorithm only works with videos which are still and there is no paning and zooming in the video.
Also if the person in the video is not moving then it can not be removed. (This is due to the fact that we cannot find the background pixels to replace the human if the human doesn't move)


## END
