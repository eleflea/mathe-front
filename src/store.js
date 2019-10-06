import axios from "axios";

const API_BASE_URL = "https://api.neumathe.xyz:8181/";

function fetchTrees() {
  return axios
    .get(`${API_BASE_URL}api/clist`)
    .then(resp => {
      const d = resp.data;
      if (d.code === 0) {
        return d.data;
      } else {
        throw new Error(d.msg);
      }
    })
    // eslint-disable-next-line
    .catch(e => console.warn(e));
}

let ft = fetchTrees();

export default {
  API_BASE_URL,
  data: {
    trees: ft.then(data => data.trees),
    update: ft.then(data => data.update)
  },
  getSegs(tk, tid) {
    return this.data.trees.then(trees => {
      if (trees.length === 0) {
        return [];
      }
      for (const lesson of trees) {
        if (lesson.name === tk) {
          const cid = lesson.data
            .map(c => c.children.map(t => t.id).includes(tid))
            .indexOf(true);
          return lesson.data[cid].children;
        }
      }
      // eslint-disable-next-line
      console.warn(`can not find lesson named '${tk}'`);
      return [];
    })
  },
  getSiblingSegs(tk, tid) {
    return this.getSegs(tk, tid).then(segs => {
      const l = segs.length
      if (l === 0) {
        return [null, null]
      }
      const index = segs.map(v => v.id).indexOf(tid)
      switch (index) {
        case -1:
          // eslint-disable-next-line
          console.warn(`can not find segment with id '${tid}'`);
          return [null, null]
        case 0:
          return [null, segs[1]]
        case l - 1:
          return [segs[l - 2], null]
        default:
          return [segs[index - 1], segs[index + 1]]
      }
    })
  },
  getSegName(tk, tid) {
    return this.getSegs(tk, tid).then(segs => {
      if (segs.length === 0) {
        return ''
      }
      const index = segs.map(v => v.id).indexOf(tid)
      if (index === -1) {
        // eslint-disable-next-line
        console.warn(`can not find segment with id '${tid}'`);
        return ''
      }
      return segs[index].text
    })
  }
}
