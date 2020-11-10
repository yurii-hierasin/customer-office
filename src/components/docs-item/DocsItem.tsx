import React from 'react';
import {Card, Dropdown} from 'react-bootstrap';
import fileIcon from '../../icons/File.svg';
import TreeDotsToggle from '../TreeDotsToggle';
import downloadIcon from '../../icons/Download.svg';
import trashIcon from '../../icons/Trash.svg';
import {IDocument, IServiceListItem} from '../../store/retail/interfaces';
import Confirm from '../confirm/Confirm';
import {useDocsItem} from './hooks';

type Props = {
    doc: IDocument
    orderServiceItem: IServiceListItem
}

const DocsItem: React.FC<Props> = ({doc, orderServiceItem}) => {
    const {
        showModal,
        dateTimeService,
        handleDelete,
        handleModalAgree,
    } = useDocsItem(doc, orderServiceItem)

    return (
        <Card className="mt-2">
            <Card.Body className="p-2">
                <div className="row">
                    <div className="col col-lg-9">
                        <img src={fileIcon} alt="File" className="mr-1 mb-1"/>
                        <span>{doc.name}</span>
                    </div>
                    <div className="col col-lg-3 d-flex justify-content-between">
                        <div>{dateTimeService.getDateTime(doc.date)}</div>
                        <Dropdown>
                            <Dropdown.Toggle as={TreeDotsToggle}/>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    download={doc.name} href={doc.url}
                                    data-test="download-btn"
                                >
                                    <img src={downloadIcon} alt="Download"
                                         className="mb-1"/>
                                    <span className="pl-1">Download</span>
                                </Dropdown.Item>
                                <Dropdown.Item
                                    as="button"
                                    onClick={handleDelete}
                                    data-test="delete-btn"
                                >
                                    <img src={trashIcon} alt="Delete" className="mb-1"/>
                                    <span className="pl-1">Delete</span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </Card.Body>

            <Confirm
                bodyText={'Would you like delete this document?'}
                handleAgree={handleModalAgree}
                show={showModal} />
        </Card>
    )
}

export default DocsItem
