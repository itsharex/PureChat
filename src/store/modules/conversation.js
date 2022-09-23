import { CONVERSATIONTYPE, GET_MESSAGE_LIST } from "../mutation-types";
import { getRoles } from "@/api/roles";
import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";

const conversation = {
  // namespaced: true,
  state: {
    noMore: true, // 加载更多  false ? 显示loading : 没有更多
    networkStatus: true, // 网络状态
    needScrollDown: -1, // 是否向下滚动
    historyMessageList: new Map(), //历史消息
    currentMessageList: [], //当前消息列表(窗口聊天消息)
    currentConversation: null, //跳转窗口的属性
    conversationList: [], //会话列表数据
  },
  mutations: {
    // 设置历史消息
    SET_HISTORYMESSAGE(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 添加消息
        case CONVERSATIONTYPE.ADD_MESSAGE: {
          const { convId, message } = payload;
          state.currentMessageList = message;
          break;
        }
        // 更新消息
        case CONVERSATIONTYPE.UPDATE_MESSAGES: {
          const { convId, message } = payload;
          state.currentMessageList.unshift(message);
          break;
        }
        // 删除消息
        case CONVERSATIONTYPE.DELETE_MESSAGE: {
          console.log(payload);
          break;
        }
        // 清除历史记录
        case CONVERSATIONTYPE.CLEAR_HISTORY: {
          state.historyMessageList = new Map();
          state.currentMessageList = [];
          break;
        }
        // 接收消息
        case CONVERSATIONTYPE.RECIVE_MESSAGE: {
          const { convId, message } = payload;
          state.currentMessageList = message.reverse();
          break;
        }
        // 加载更多状态
        case CONVERSATIONTYPE.UPDATE_NOMORE: {
          state.noMore = payload;
          break;
        }
      }
    },
    // 设置会话
    SET_CONVERSATION(state, action) {
      const { type, payload } = action;
      switch (type) {
        // 跳转会话
        case CONVERSATIONTYPE.UPDATE_CURRENT_SELECTED_CONVERSATION: {
          if (payload) {
            console.log(payload,"切换会话")
           
            // if (payload?.id == state.currentConversation?.id) return;
            // state.needScrollDown = 0;
            // state.noMore = false;
            state.currentConversation = payload;
           
          }
          break;
        }
        // 获取会话列表数据
        case CONVERSATIONTYPE.REPLACE_CONV_LIST: {
          state.conversationList = payload;
          break;
        }
      }
    },
    // 设置网络状态
    SET_NETWORK_STATUS(state, action) {
      state.networkStatus = action;
    },
  },
  actions: {
    // 获取消息列表
    async [GET_MESSAGE_LIST]({ commit, dispatch, state }) {
        if(state.currentConversation){
          const { conversationID } = state.currentConversation


        }
    },
  },
  getters: {},
};

export default conversation;
