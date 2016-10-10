import Axios from 'axios';
import {morphBoard} from '../../helpers/morph-4chan';
import { chan as options } from '../../helpers/request-config.js';

export default function (req, res, next) {
	console.log("Getting board")
    const boardID = req.params.boardID;
    const url = `https://a.4cdn.org/${boardID}/catalog.json`;
    Axios(url, options)
        .then( board => res.send(morphBoard(board.data, boardID)) )
        .catch( err => console.log(`ERROR - Board fetch: ${err}`));
}