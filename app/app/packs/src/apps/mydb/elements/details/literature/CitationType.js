const CitationTypeMap = {
  citedOwn: {
    def: '引用了自己的工作——准确描述这个实验的参考文献/同一作者',
    short: 'cited own work',
    datacite: ['IsCitedBy']
  },
  citedRef: {
    def: '引用参考文献-描述他人所做实验的参考文献',
    short: 'cited reference',
    dataCite: ['Continues']
  },
  referTo: {
    def: '参考-参考类似实验或相关文献',
    short: 'referring to',
    dataCite: ['References']
  },
  uncategorized: {
    def: '未分类-未设置引用类型',
    short: 'uncategorized',
    dataCite: []
  }
};

const CitationType = Object.keys(CitationTypeMap).filter(e => e !== 'uncategorized');
const CitationTypeEOL = ['cited', 'citing', null, ''];

export { CitationTypeMap, CitationType, CitationTypeEOL };
