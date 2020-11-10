import {IDocument} from '../store/retail/interfaces';

export default class DocumentsService {

  getByType(docs: IDocument[], type: string): IDocument[] {
    return docs.filter(doc => {
      switch (type) {
        case 'default': return doc.tags.includes('generated')
        case 'uploaded': return !doc.tags.includes('generated')
        default: return true
      }
    })
  }

  simulateDownloadEachDoc(allDocs: IDocument[]) {
    const link = document.createElement('a');

    for (const file of allDocs) {
      link.setAttribute('href', file.url);
      link.setAttribute('download', file.name);
      link.setAttribute('target', '_blank');
      link.click();
    }
  }

}
