import {render, replace, remove, appendChildComponent, RenderPosition} from '../utils/render';
import FilmCardComponent from '../components/film-card';
import FilmDetailsComponent from '../components/film-details';
import CommentComponent from '../components/comment';
import CommentsModel from '../models/comments-model';
import {ESC_KEY_CODE, ENTER_KEY_CODE} from '../utils/const';

export const Mode = {
  DEFAULT: `default`,
  DETAILS: `details`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._film = null;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._commentComponent = null;
    this._commentsModel = null;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.DEFAULT;

    this._onEscPress = this._onEscPress.bind(this);
    this._onAddComment = this._onAddComment.bind(this);
  }

  render(film) {
    const oldFilmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._film = film;
    this._filmCardComponent = new FilmCardComponent(this._film);
    this._filmDetailsComponent = new FilmDetailsComponent(this._film, this._film.comments.length);
    this._commentsModel = new CommentsModel();
    this._commentsModel.setComments(this._film.comments);

    this._filmCardComponent.setTitleClickHandler(() => this._openFilmDetails());
    this._filmCardComponent.setPosterClickHandler(() => this._openFilmDetails());
    this._filmCardComponent.setCommentsClickHandler(() => this._openFilmDetails());
    this._filmDetailsComponent.setCloseBtnClickHandler(() => this._closeFilmDetails());

    this._filmCardComponent.setAddToWatchlistClickHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        watchlist: !this._film.watchlist
      }));
    });

    this._filmCardComponent.setAlreadyWatchedClickHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        watched: !this._film.watched
      }));
    });

    this._filmCardComponent.setAddToFavouriteClickHandler(() => {
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        favorite: !this._film.favorite
      }));
    });

    this._filmDetailsComponent.setAddToWatchlistClickHandler(() => {
      remove(this._filmDetailsComponent);
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        watchlist: !this._film.watchlist
      }));
    });

    this._filmDetailsComponent.setAlreadyWatchedClickHandler(() => {
      remove(this._filmDetailsComponent);
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        watched: !this._film.watched
      }));
    });

    this._filmDetailsComponent.setAddToFavouriteClickHandler(() => {
      remove(this._filmDetailsComponent);
      this._onDataChange(this, this._film, Object.assign({}, this._film, {
        favorite: !this._film.favorite
      }));
    });

    this._filmDetailsComponent.setEmojiClickHandler((evt) => {
      this._filmDetailsComponent.setEmojiById(evt.target.id);
    });

    if (oldFilmCardComponent && oldFilmDetailsComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);
      replace(this._filmDetailsComponent, oldFilmDetailsComponent);
    } else {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeFilmDetails();
    }
  }

  _getFormData() {
    const form = this._filmDetailsComponent.getFormElement();
    const formData = new FormData(form);
    const emojiContainer = this._filmDetailsComponent.getEmojiContainer();
    const commentText = formData.get(`comment`).trim();

    if (emojiContainer.innerHTML !== `` && commentText !== ``) {
      const emojiType = emojiContainer.firstChild.dataset.type;

      return {
        text: commentText,
        date: new Date().toISOString(),
        emotion: emojiType,
      };
    }

    return null;
  }

  _onAddComment(evt) {
    if (evt.ctrlKey && evt.keyCode === ENTER_KEY_CODE) {
      const newComment = this._getFormData();

      if (newComment) {
        const isSuccess = this._commentsModel.addComment(newComment);
        if (isSuccess) {
          const updatedComments = this._commentsModel.getComments();

          const updatedMovie = Object.assign({}, this._film, {
            comments: updatedComments
          });

          this._onDataChange(this, updatedMovie);
          this._renderComments(updatedComments);
        }
      }
    }
  }

  _onDeleteComment(commentId) {
    const isSuccess = this._commentsModel.removeComment(commentId);
    if (isSuccess) {
      const updatedComments = this._commentsModel.getComments();
      const updatedMovie = Object.assign({}, this._film, {
        comments: updatedComments
      });

      this._onDataChange(this, updatedMovie);
      this._renderComments(updatedComments);
    }
  }

  _renderComments(comments) {
    if (comments.length > 0) {
      const commentsList = this._filmDetailsComponent.getElement().querySelector(`.film-details__comments-list`);
      commentsList.innerHTML = ``;

      comments.forEach((comment) => {
        let commentComponent = new CommentComponent(comment);
        appendChildComponent(commentsList, commentComponent);

        commentComponent.setDeleteButtonHandler((evt) => {
          evt.preventDefault();
          const commentId = commentComponent.getCommentId();
          this._onDeleteComment(commentId);
        });
      });
    }
  }

  _openFilmDetails() {
    this._onViewChange();
    document.body.appendChild(this._filmDetailsComponent.getElement());
    this._mode = Mode.DETAILS;
    this._filmDetailsComponent.recoveryListeners();
    this._renderComments(this._commentsModel.getComments());
    document.addEventListener(`keydown`, this._onAddComment);
  }

  _closeFilmDetails() {
    document.removeEventListener(`keydown`, this._onEscPress);
    remove(this._filmDetailsComponent);
    this._mode = Mode.DEFAULT;
  }

  _onEscPress(evt) {
    if (evt.keyCode === ESC_KEY_CODE) {
      this._closeFilmDetails();
    }
  }

  destroy() {
    remove(this._filmCardComponent);

    if (this._filmDetailsComponent) {
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscPress);
    }
  }
}
