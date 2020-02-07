/*eslint-env es6*/
/*eslint no-use-before-define: [2, "nofunc"]*/

import React from 'react';
import ReactDOM from 'react-dom';

/******************************************************************************
 * My beautiful app:                                                          *
 ******************************************************************************/

class SearchBox extends React.Component {
  get empty() {
    return this.props.searchString.trim() === '';
  }

  get submitDisabled() {
    return this.empty;
  }

  render() {
    return (
      <form method="POST" action="#" onSubmit={doSearch}>
        <SearchTextInput
          value={this.props.searchString}
          onChange={evt => changeSearchString(evt.target.value)} />
      </form>
    );
  }
}

/* Bootstrap-ified components. */

const SearchTextInput = (props) => (
  <div className="form-group">
    <input type="text" placeholder="Search..."
      className='form-control input-lg' {...props} />
  </div>
);

const ReviewList = ({reviews, searchString}) => {
  let list;
  const pattern = normalizeForComparison(searchString.trim());

  if (pattern === '') {
    list = reviews;
  } else {
    list = reviews.filter(({text}) => normalizeForComparison(text).match(pattern));
  }

  return (
    <section className="message-list panel panel-default">
      <div className="panel-body">
        {list.map((props) => <Review key={props.id} {...props} />)}
      </div>
    </section>
  );
};

const Review = ({text, name, avatarURL}) => (
  <div className="media">
    <div className="media-left">
      <a href="#">
        <img className="media-object message-avatar" src={avatarURL} />
      </a>
    </div>
    <div className="media-body">
      <h4 className="media-heading">{name}</h4>
      <p>{text}</p>
    </div>
  </div>
);

/* Weird global stuff; pretend it doesn't exist. */

let currentSearchString = '';
const reviews = [
  {
    id: 1,
    text: "What's with the secret room in Phởbulous?",
    name: 'Eddie Antonio Santos',
    avatarURL: 'https://pbs.twimg.com/profile_images/591750801590091776/NdtsEAu7.jpg'
  },
  {
    id: 3,
    text: "Phởshizzle my nizzle!",
    name: 'Eddie Antonio Santos',
    avatarURL: 'https://pbs.twimg.com/profile_images/591750801590091776/NdtsEAu7.jpg'
  },
  {
    id: 2,
    text: "Noodle feast: #truthinadvertising 🙇",
    name: 'Eddie Antonio Santos',
    avatarURL: 'https://pbs.twimg.com/profile_images/591750801590091776/NdtsEAu7.jpg'
  },
  {
    id: 4,
    text: "Could you stop it with all these phởking puns?",
    name: 'Eddie Antonio Santos',
    avatarURL: 'https://pbs.twimg.com/profile_images/591750801590091776/NdtsEAu7.jpg'
  }
];

function normalizeForComparison(text) {
  return text.toLowerCase();
}

function changeSearchString(text) {
  currentSearchString = text;
  rerender();
}

function doSearch(event) {
  event.preventDefault();

  reviews.push({
    text: currentSearchString,
    name: 'Eddie Antonio Santos',
    avatarURL: 'https://pbs.twimg.com/profile_images/911641946505883648/CU7xLOWI_400x400.jpg'
  });
  currentSearchString = '';

  rerender();
}

function rerender() {
  const container = document.getElementById('composer');
  ReactDOM.render(
    <div>
      <SearchBox searchString={currentSearchString} />
      <ReviewList reviews={reviews} searchString={currentSearchString}/>
    </div>,
    container
  );
}

/* Register initial render. */
document.addEventListener("DOMContentLoaded", rerender);
