import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash, faPlus, faThumbsUp, faThumbsDown, faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 
library.add(faEdit, faTrash, faPlus, faThumbsUp, faThumbsDown, faArrowLeft, faSave)
 
React.component('font-awesome-icon', FontAwesomeIcon)