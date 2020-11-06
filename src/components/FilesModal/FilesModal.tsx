import React from 'react';
import {Dropdown, Modal, Spinner} from 'react-bootstrap';
import {IOrder, IServiceListItem} from '../../store/retail/interfaces';
import DocumentsService from '../../services/documents.service';
import fileIcon from '../../icons/File.svg'
import downloadIcon from '../../icons/Download.svg'
import trashIcon from '../../icons/Trash.svg'
import DateTimeService from '../../services/date-time.service';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import TreeDotsToggle from '../TreeDotsToggle';
import {checkIfLoading} from '../../store/ui/selectors';
import {ALL_DOCS_REQUEST} from '../../store/docs/types';
import {useAllDocs} from '../../hooks/useAllDocs';

type Props = {
    order: IOrder,
    orderServiceItem: IServiceListItem,
    show: boolean
    handleClose: () => void
}

const FilesModal: React.FC<Props> = ({order, orderServiceItem, show, handleClose}) => {
    const {orderDocs, orderServiceItemDocs} = useAllDocs(order, orderServiceItem)
    const locale = useSelector((state: RootState) => state.app.initOptions.locale)
    const dateTimeService = new DateTimeService(locale)
    const allDocs = [...orderDocs, ...orderServiceItemDocs]
    const documentsService = new DocumentsService()
    const isLoading = useSelector(((state: RootState) => checkIfLoading(state, [ALL_DOCS_REQUEST])))

    const handleDownload = (): void => {
        alert('download')
    }

    const handleDelete = (): void => {
        alert('delete')
    }

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-70w">
            <Modal.Header closeButton>
                <Modal.Title>File manager</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status" variant="success">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    ['uploaded', 'default'].map(docType => {
                        return (
                            <div key={docType}>
                                <h5>{docType === 'uploaded' ? 'Uploaded documents' : 'Default documents'}</h5>
                                {documentsService.getByType(allDocs, docType).map(doc => {
                                    return (
                                        <div className="row" key={doc.id}>
                                            <div className="col col-lg-8">
                                                <img src={fileIcon} alt="File" className="mr-1 mb-1"/>
                                                <span>{doc.name}</span>
                                            </div>
                                            <div className="col col-lg-4 d-flex justify-content-between">
                                                <div>{dateTimeService.getDateTime(doc.date)}</div>
                                                <Dropdown>
                                                    <Dropdown.Toggle as={TreeDotsToggle}/>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            as="button"
                                                            onClick={handleDownload}
                                                            data-test="download-btn"
                                                        >
                                                            <img src={downloadIcon} alt="Download"/>
                                                            <span className="pl-1">Download</span>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            as="button"
                                                            onClick={handleDelete}
                                                            data-test="delete-btn"
                                                        >
                                                            <img src={trashIcon} alt="Delete"/>
                                                            <span className="pl-1">Delete</span>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                )}


            </Modal.Body>
        </Modal>
    )
}

export default FilesModal
