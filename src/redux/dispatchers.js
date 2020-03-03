import {
	actionSetSuccessMessage,
	actionSetErrorMessage,
	actionClearMessage,
	actionGetState,
	actionCreateBoard,
	actionUpdateBoard,
	actionDeleteBoard,
	actionCreateColumn,
	actionUpdateColumn,
	actionDeleteColumn,
	actionCreateTask,
	actionUpdateTask,
	actionDeleteTask,
	actionMoveTaskTo,
} from './actions';

export function dispatchSetSuccessMessage(dispatch, messages) {
	dispatch(actionSetSuccessMessage(messages));
}

export function dispatchSetErrorMessage(dispatch, messages) {
	dispatch(actionSetErrorMessage(messages));
}

export function dispatchClearMessage(dispatch) {
	dispatch(actionClearMessage());
}

export function dispatchGetState(dispatch, state) {
	dispatch(actionGetState(state));
}

export function dispatchCreateBoard(dispatch, board) {
	dispatch(actionCreateBoard(board));
}

export function dispatchUpdateBoard(dispatch, board) {
	dispatch(actionUpdateBoard(board));
}

export function dispatchDeleteBoard(dispatch, boardId) {
	dispatch(actionDeleteBoard(boardId));
}

export function dispatchCreateColumn(dispatch, column) {
	dispatch(actionCreateColumn(column));
}

export function dispatchUpdateColumn(dispatch, column) {
	dispatch(actionUpdateColumn(column));
}

export function dispatchDeleteColumn(dispatch, columnId) {
	dispatch(actionDeleteColumn(columnId));
}

export function dispatchCreateTask(dispatch, task) {
	dispatch(actionCreateTask(task));
}

export function dispatchUpdateTask(dispatch, task) {
	dispatch(actionUpdateTask(task));
}

export function dispatchDeleteTask(dispatch, taskId) {
	dispatch(actionDeleteTask(taskId));
}

export function dispatchMoveTaskTo(dispatch, taskId, columnId, newPosition) {
	dispatch(actionMoveTaskTo(taskId, columnId, newPosition));
}

