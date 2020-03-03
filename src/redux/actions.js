import { sortByPositionAscending, setPositionFromIndex } from '../helpers';

const MESSAGE_SET_SUCCESS = "SET_SUCCESS_MESSAGE";
const MESSAGE_SET_ERROR = "SET_ERROR_MESSAGE";
const MESSAGE_CLEAR = "CLEAR_MESSAGE";
const STATE_GET = 'GET_STATE';
const BOARD_CREATE = 'CREATE_BOARD';
const BOARD_UPDATE = 'UPDATE_BOARD';
const BOARD_DELETE = 'DELETE_BOARD';
const COLUMN_CREATE = 'CREATE_COLUMN';
const COLUMN_UPDATE = 'UPDATE_COLUMN';
const COLUMN_DELETE = 'DELETE_COLUMN';
const TASK_CREATE = 'CREATE_TASK';
const TASK_UPDATE = 'UPDATE_TASK';
const TASK_DELETE = 'DELETE_TASK';
const TASK_MOVE_TO_COLUMN = 'DELETE_TASK_TO';

export const actionSetSuccessMessage = (messages) => {
	return { type: MESSAGE_SET_SUCCESS, payload: { messages } };
};

export const actionSetErrorMessage = (messages) => {
	return { type: MESSAGE_SET_ERROR, payload: { messages } };
};

export const actionClearMessage = () => {
	return { type: MESSAGE_CLEAR };
};

export const actionGetState = (state) => {
	return { type: STATE_GET, payload: state };
};

export const actionCreateBoard = (board) => {
	return { type: BOARD_CREATE, payload: board };
};

export const actionUpdateBoard = (board) => {
	return { type: BOARD_UPDATE, payload: board };
};

export const actionDeleteBoard = (boardId) => {
	return { type: BOARD_DELETE, payload: boardId };
};

export const actionCreateColumn = (column) => {
	return { type: COLUMN_CREATE, payload: column };
};

export const actionUpdateColumn = (column) => {
	return { type: COLUMN_UPDATE, payload: column };
};

export const actionDeleteColumn = (columnId) => {
	return { type: COLUMN_DELETE, payload: columnId };
};

export const actionCreateTask = (task) => {
	return { type: TASK_CREATE, payload: task };
};

export const actionUpdateTask = (task) => {
	return { type: TASK_UPDATE, payload: task };
};

export const actionDeleteTask = (taskId) => {
	return { type: TASK_DELETE, payload: taskId };
};

export const actionMoveTaskTo = (taskId, columnId, newPosition) => {
	return { type: TASK_MOVE_TO_COLUMN, payload: { taskId, columnId, newPosition } };
};

const initialState = {
	boards: [],
	columns: [],
	tasks: [],
	messages: [],
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case MESSAGE_SET_SUCCESS: {
			return {
				...state,
				messages: action.payload.messages.map(text => {
					return { severity: 'success', summary: 'Success', detail: text };
				}),
			};
		}
		case MESSAGE_SET_ERROR: {
			return {
				...state,
				messages: action.payload.messages.map(text => {
					return { severity: 'error', summary: 'Error', detail: text };
				}),
			};
		}
		case MESSAGE_CLEAR: {
			return {
				...state,
				messages: []
			};
		}
		case STATE_GET: {
			return {
				...state,
				...action.payload,
				messages: []
			};
		}
		case BOARD_CREATE: {
			return {
				...state,
				boards: state.boards.concat(action.payload),
			};
		}
		case BOARD_UPDATE: {
			return {
				...state,
				boards: state.boards.map(board => board.id === action.payload.id ? { ...board, ...action.payload } : board)
			};
		}
		case BOARD_DELETE: {
			return {
				...state,
				boards: state.boards.filter(board => board.id !== action.payload),
				columns: state.columns.filter(column => column.board_id !== action.payload),
				tasks: state.tasks.filter(task => task.board_id !== action.payload)
			};
		}
		case COLUMN_CREATE: {
			return {
				...state,
				columns: state.columns.concat(action.payload),
			};
		}
		case COLUMN_UPDATE: {
			return {
				...state,
				columns: state.columns.map(column => column.id === action.payload.id ? { ...column, ...action.payload } : column)
			};
		}
		case COLUMN_DELETE: {
			return {
				...state,
				columns: state.columns.filter(column => column.id !== action.payload),
				tasks: state.tasks.filter(task => task.column_id !== action.payload)
			};
		}
		case TASK_CREATE: {
			return {
				...state,
				tasks: state.tasks.concat(action.payload),
			};
		}
		case TASK_UPDATE: {
			return {
				...state,
				tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload } : task)
			};
		}
		case TASK_DELETE: {
			const columnId = state.tasks.find(task => task.id === action.payload).column_id;
			const otherTasks = state.tasks.filter(task => task.column_id !== columnId);
			const columnTasks = state.tasks
				.filter(task => task.column_id === columnId && task.id !== action.payload)
				.sort(sortByPositionAscending)
				.map(setPositionFromIndex);
			return {
				...state,
				tasks: [...otherTasks, ...columnTasks]
			};
		}
		case TASK_MOVE_TO_COLUMN: {
			const movedTask = state.tasks.find(task => task.id === action.payload.taskId);
			const oldColumnId = movedTask.column_id;
			const newColumnId = action.payload.columnId;
			movedTask.column_id = newColumnId;
			movedTask.position = action.payload.newPosition;
			const otherTasks = state.tasks
				.filter(task =>
					task.column_id !== oldColumnId
					&& task.column_id !== newColumnId
					&& task.id !== movedTask.id);
			const oldColumnTasks = oldColumnId === newColumnId
				? []
				: state.tasks
					.filter(task => task.column_id === oldColumnId && task.id !== movedTask.id)
					.sort(sortByPositionAscending)
					.map(setPositionFromIndex);
			const newColumnTasks = state.tasks
				.filter(task => task.column_id === newColumnId && task.id !== movedTask.id)
				.sort(sortByPositionAscending);
			newColumnTasks.splice(movedTask.position, 0, movedTask);
			newColumnTasks.map(setPositionFromIndex);
			return {
				...state,
				tasks: [...otherTasks, ...oldColumnTasks, ...newColumnTasks]
			};
		}
		default:
			return state;
	}
}

export default rootReducer;