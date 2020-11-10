import React, {ChangeEvent, useRef, useState} from 'react';
import {Button, Card, Modal, ProgressBar, Spinner} from 'react-bootstrap';
import {DocTypesEnum, IOrder, IServiceListItem} from '../../store/retail/interfaces';
import DocumentsService from '../../services/documents.service';
import fileIcon from '../../icons/File.svg'
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {checkIfLoading} from '../../store/ui/selectors';
import {ALL_DOCS_REQUEST, UPLOAD_DOC_REQUEST} from '../../store/docs/types';
import {useAllDocs} from '../../hooks/useAllDocs';
import {requestUploadDoc} from '../../store/docs/actions';
import DocsItem from '../docs-item/DocsItem';

type Props = {
    order: IOrder,
    orderServiceItem: IServiceListItem,
    handleClose: () => void
    documentsService: DocumentsService
}

const DocsModal: React.FC<Props> = ({order, orderServiceItem, handleClose, documentsService}) => {
    const dispatch = useDispatch()
    const {orderDocs, orderServiceItemDocs} = useAllDocs(order, orderServiceItem)
    const allDocs = [...orderDocs, ...orderServiceItemDocs]
    const [fileName, setFileName] = useState('')

    const isLoading = useSelector(((state: RootState) => checkIfLoading(state, [ALL_DOCS_REQUEST])))
    const isAddDocProgress = useSelector((state: RootState) => checkIfLoading(state, [UPLOAD_DOC_REQUEST]))
    const uploadProgress = useSelector((state: RootState) => state.docs.uploadProgress)

    const handleDownloadAllClick = (): void => {
        documentsService.simulateDownloadEachDoc(allDocs)
    }

    const hiddenFileInput = useRef(null)
    const handleUploadClick = (): void => {
        // @ts-ignore
        hiddenFileInput.current.click()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        // @ts-ignore
        const selectedFile = e.target.files[0]

        if (selectedFile) {
            const formData = new FormData();

            formData.append(
                'file',
                selectedFile,
                selectedFile.name
            );

            setFileName(selectedFile.name)
            dispatch(requestUploadDoc(formData, orderServiceItem))
        }
    }

    return (
        <Modal show={true} onHide={handleClose} dialogClassName="modal-70w">
            <Modal.Header closeButton>
                <Modal.Title>Documents management</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status" variant="success">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    [DocTypesEnum.uploaded, DocTypesEnum.default].map(docType => {
                        return (
                            <div key={docType} data-test={`doc-type-${docType}`}>
                                {docType === DocTypesEnum.uploaded ? (
                                    <>
                                        <div className="d-flex justify-content-between mb-3">
                                            <h6 className="pt-2">Uploaded documents</h6>
                                            <div>
                                                <Button
                                                    variant="success" onClick={handleDownloadAllClick}
                                                    data-test="download-all-btn"
                                                >
                                                    DOWNLOAD ALL
                                                </Button>
                                                <Button
                                                    variant="success" onClick={handleUploadClick} className="ml-2"
                                                    data-test="upload-beautiful-btn"
                                                >
                                                    UPLOAD
                                                </Button>
                                                <input
                                                    type="file" style={{display: 'none'}}
                                                    onChange={handleFileChange}
                                                    ref={hiddenFileInput}
                                                    data-test="upload-ugly-btn"
                                                />
                                            </div>
                                        </div>

                                        {isAddDocProgress && (
                                            <Card className="mt-2" key="dummy">
                                                <Card.Body className="p-2">
                                                    <div className="row">
                                                        <div className="col col-lg-8">
                                                            <img src={fileIcon} alt="File" className="mr-1 mb-1"/>
                                                            <span>{fileName}</span>
                                                        </div>
                                                        <div className="col">
                                                            <ProgressBar now={uploadProgress} className="mt-1"/>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        )}
                                    </>
                                ) : (
                                    <h6 className="mb-3 mt-3">Default documents</h6>
                                )}

                                {documentsService.getByType(allDocs, docType).map(doc => (
                                    <DocsItem orderServiceItem={orderServiceItem} doc={doc} key={doc.id}/>
                                ))}
                            </div>
                        )
                    })
                )}
            </Modal.Body>
        </Modal>
    )
}

export default DocsModal
