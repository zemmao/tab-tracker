'use strict';

import Api from '@/services/Api';

export default {
  index (params) {
    return Api().get('history', {
      params
    });
  },
  post (historyEntry) {
    return Api().post('history', historyEntry);
  }
};
