import Router from 'express';
import { Createcomment,deleteComment,updateComment } from '../Controllers/comment.sontroller.js';

const commentRouter = Router();
commentRouter.post('/createComment', Createcomment);
commentRouter.delete('/deleteComment/:id', deleteComment);
commentRouter.put('/updateComment/:id', updateComment);


export default commentRouter;
