import express from 'express';
const router = express.Router();
import html from '../mainHtml';

router.get('/',(req,res) => {
  res.send(html);
});
router.get(/^(\/tweets|\/candidates|\/endorsers|\/endorsements|\/tags)/,(req,res) => {
  res.send(html);
});

export default router;
