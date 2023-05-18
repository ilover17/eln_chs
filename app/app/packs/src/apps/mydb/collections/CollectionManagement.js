import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import MyCollections from 'src/apps/mydb/collections/MyCollections';
import MySharedCollections from 'src/apps/mydb/collections/MySharedCollections';
import SharedWithMeCollections from 'src/apps/mydb/collections/SharedWithMeCollections';
import SyncWithMeCollections from 'src/apps/mydb/collections/SyncWithMeCollections';

const CollectionManagement = () => {
  const tabContents = [
    <Tab eventKey={0} key={0} title="我的集合"><MyCollections /></Tab>,
    <Tab eventKey={1} key={1} title="我分享的集合"><MySharedCollections /></Tab>,
    <Tab eventKey={2} key={2} title="分享给我的集合 "><SharedWithMeCollections /></Tab>,
    <Tab eventKey={3} key={3} title="同步给我的集合 "><SyncWithMeCollections /></Tab>,
  ];

  return (
    <div id="collection-management">
      <Tabs defaultActiveKey={0} id="collection-management-tab">
        {tabContents.map(e => e)}
      </Tabs>
    </div>
  );
};

export default CollectionManagement;
