import {
  Collapse,
  Input,
  List,
  Modal,
  Typography,
  Avatar,
  Tooltip,
  Spin,
  notification,
} from "antd";
import styles from "./right-menu.module.scss";

import copy from "copy-to-clipboard";

const { Panel } = Collapse;

import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  BookOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import Api from "../../services/Api";
import { UserListInterface } from "../../interfaces/UserListInterface";
import { submitBuildingForm } from "../../effects/object";
import { ListsUpdated } from "../../effects/lists.effects";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragableListItem from "./DraggableListItem";
import update from "immutability-helper";

const UsersLists = () => {
  /* Modals */
  const [visibleBlMod, setVisibleBlMod] = useState(false);
  const [visibleObjMod, setVisibleObjMod] = useState(false);

  const showModalBlMod = () => {
    setNewBlockListName("");
    setVisibleBlMod(true);
  };

  const hideModalBlMod = () => {
    setVisibleBlMod(false);
  };

  const showModalObjMod = () => {
    setNewBuildingListName("");
    setVisibleObjMod(true);
  };

  const hideModalObjMod = () => {
    setVisibleObjMod(false);
  };

  /* /Modals */

  // ListsUpdated.
  useEffect(() => {
    const unwatch = ListsUpdated.watch(async () => {
      await getLists();
    });

    return function cleanup() {
      unwatch();
    };
  });

  const [newBlockListName, setNewBlockListName] = useState("");
  const [newBuildingListName, setNewBuildingListName] = useState("");

  const confirm = (entityName: string, id: number) => {
    Modal.confirm({
      title: "Удалить элемент из списка?",
      icon: <ExclamationCircleOutlined />,
      content: "Вы уверены, что хотите удалить элемент из списка?",
      okText: "Да",
      cancelText: "Отмена",
      onOk: async () => {
        if (entityName === "building") {
          await Api.deleteBuildingList(id);
        } else if (entityName === "block") {
          await Api.deleteBlockList(id);
        }

        notification.success({
          message: `Элемент удален`,
          placement: "bottomRight",
        });

        await getLists();
      },
    });
  };

  const genExtra = (entityName: string, id: number) => (
    <>
      <Tooltip title="Удалить">
        <a
          style={{
            color: "#262626",
          }}
          onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
            confirm(entityName, id);
          }}
          href={"#"}
        >
          <DeleteOutlined />
        </a>
      </Tooltip>

      {entityName === "block" && (
        <Tooltip title="Лонглист">
          <a
            onClick={() => {
              open(Api.apiUrl + "/exports/blocksLonglist/" + id);
            }}
            style={{
              color: "#262626",
            }}
            href={"#"}
          >
            <DownloadOutlined
              style={{
                paddingLeft: ".3em",
              }}
            />
          </a>
        </Tooltip>
      )}

      {entityName === "building" && (
        <Tooltip title="Лонглист">
          <a
            onClick={() => {
              open(Api.apiUrl + "/exports/longlist/" + id);
            }}
            style={{
              color: "#262626",
            }}
            href={"#"}
          >
            <DownloadOutlined
              style={{
                paddingLeft: ".3em",
              }}
            />
          </a>
        </Tooltip>
      )}

      {entityName === "building" && (
        <Tooltip title="Cкачать бриф">
          <a
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              open(Api.apiUrl + "/exports/new-brief/" + id);
            }}
            style={{
              color: "#262626",
            }}
            href={"#"}
          >
            <FileDoneOutlined
              style={{
                paddingLeft: ".3em",
              }}
            />
          </a>
        </Tooltip>
      )}
    </>
  );

  const [isListsLoading, setIsListsLoading] = useState(false);

  const [blocksLists, setBlocksLists] = useState<UserListInterface[]>([]);
  const [buildingsLists, setBuildingsLists] = useState<UserListInterface[]>([]);

  const getLists = async () => {
    setIsListsLoading(true);

    const result = await Promise.all([
      await Api.getBlocksLists(),
      Api.getBuildingsLists(),
    ]);

    setBlocksLists(result[0].data);
    setBuildingsLists(result[1].data);

    setIsListsLoading(false);
  };

  useEffect(() => {
    getLists();
  }, []);

  return (
    <>
      {!isListsLoading && (
        <>
          <div className={styles.HeadRow}>
            <h4>Мои здания</h4>{" "}
            <Tooltip placement="topLeft" title="Cоздать список">
              <a href={"#"} onClick={showModalObjMod}>
                <PlusOutlined />
              </a>
            </Tooltip>
          </div>
          {buildingsLists.length === 0 && (
            <div
              style={{
                marginBottom: "1em",
              }}
            >
              У вас еще нет списков объектов,{" "}
              <a onClick={showModalObjMod} href={"#"}>
                создать?
              </a>
            </div>
          )}
          {buildingsLists.length > 0 && (
            <Collapse accordion>
              {buildingsLists.map((item: UserListInterface, number: number) => {
                return (
                  <Panel
                    header={item.name}
                    key={item.id}
                    extra={genExtra("building", item.id)}
                  >
                    <DndProvider backend={HTML5Backend}>
                      <List
                        itemLayout="horizontal"
                        // dataSource={item.buildings?.sort((a: any,b: any)=>a.order-b.order)}
                        dataSource={item.buildings}
                        renderItem={(itemBld, index) => (
                          <DragableListItem
                            key={index}
                            index={index}
                            item={itemBld}
                            onDelete={async () => {
                              let buildingsListsClone = [...buildingsLists];
                              const list = buildingsListsClone.find(
                                (itemL) => itemL.id === item.id
                              );
                              const listIndex = buildingsListsClone.findIndex(
                                (itemL) => itemL.id === item.id
                              );

                              // @ts-ignore
                              const newBuildings = (
                                list || []
                              // @ts-ignore
                              )?.buildings.filter((el) => el.id !== itemBld.id);

                              let newList = { ...list };
                              newList.buildings = newBuildings;

                              // @ts-ignore
                              buildingsListsClone[listIndex] = newList;

                              setBuildingsLists(buildingsListsClone);

                              await Api.toggleBuildingInlist(
                                item.id,
                                itemBld.id
                              );
                            }}
                            onMove={async (
                              oldIndex: number,
                              newIndex: number
                            ) => {
                              let buildingsListsClone = [...buildingsLists];
                              const list = buildingsListsClone.find(
                                (itemL) => itemL.id === item.id
                              );
                              if (!list) {
                                return;
                              }
                              const listIndex = buildingsListsClone.findIndex(
                                (itemL) => itemL.id === item.id
                              );

                              // @ts-ignore
                              console.log(list.buildings.map((el) => el.id));

                              // @ts-ignore
                              const movedBld = list.buildings[oldIndex];
                              const newBuildings = update(list?.buildings, {
                                $splice: [
                                  [oldIndex, 1],
                                  [newIndex, 0, movedBld],
                                ],
                              });

                              console.log(newBuildings?.map((el) => el.id));

                              let newList = { ...list };
                              newList.buildings = newBuildings;

                              // @ts-ignore
                              buildingsListsClone[listIndex] = newList;
                              setBuildingsLists(buildingsListsClone);

                              if (newBuildings) {
                                const newOrder = newBuildings.map(
                                  (el) => el.id
                                );
                                await Api.reorderBuildingsInList(
                                  newOrder,
                                  item.id
                                );
                              }
                            }}
                          />
                        )}
                      />
                    </DndProvider>
                  </Panel>
                );
              })}
            </Collapse>
          )}
          <br />
          <div className={styles.HeadRow}>
            <h4>Мои блоки</h4>{" "}
            <Tooltip placement="topLeft" title="Cоздать список">
              <a href={"#"} onClick={showModalBlMod}>
                <PlusOutlined />
              </a>
            </Tooltip>
          </div>

          {blocksLists.length === 0 && (
            <div
              style={{
                marginBottom: "1em",
              }}
            >
              У вас еще нет списков офисов,{" "}
              <a onClick={showModalBlMod} href={"#"}>
                создать?
              </a>
            </div>
          )}

          {blocksLists.length > 0 && (
            <Collapse accordion>
              {blocksLists.map((item: UserListInterface, number: number) => {
                return (
                  <Panel
                    header={item.name}
                    key={item.id}
                    extra={genExtra("block", item.id)}
                  >
                    <List
                      itemLayout="horizontal"
                      dataSource={item.blocks}
                      renderItem={(itemBl) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              itemBl.pics[0] ? (
                                <Avatar size={60} src={itemBl.pics[0].url} />
                              ) : (
                                <Avatar size={60} icon={<BookOutlined />} />
                              )
                            }
                            title={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                <a
                                  rel={"noreferrer"}
                                  target={"_blank"}
                                  href={`/blocks/${itemBl.id}`}
                                >
                                  {itemBl.name || `#${itemBl.id}`}
                                </a>
                                <Tooltip title="Удалить">
                                  <a
                                    style={{
                                      color: "#262626",
                                    }}
                                    href={"#"}
                                    onClick={async () => {
                                      let blocksListsClone = [...blocksLists];
                                      const list = blocksListsClone.find(
                                        (itemL) => itemL.id === item.id
                                      );
                                      const listIndex =
                                        blocksListsClone.findIndex(
                                          (itemL) => itemL.id === item.id
                                        );

                                      // @ts-ignore
                                      const newBlocks = (
                                        list || []
                                          // @ts-ignore
                                      ).blocks.filter(
                                          // @ts-ignore
                                        (el) => el.id !== itemBl.id
                                      );

                                      let newList = { ...list };
                                      newList.blocks = newBlocks;

                                      // @ts-ignore
                                      blocksListsClone[listIndex] = newList;

                                      setBlocksLists(blocksListsClone);

                                      await Api.toggleBlockInlist(
                                        item.id,
                                        itemBl.id
                                      );
                                    }}
                                  >
                                    <DeleteOutlined />
                                  </a>
                                </Tooltip>
                              </div>
                            }
                            description={`#${itemBl.id}, ${itemBl.building.address}`}
                          />
                        </List.Item>
                      )}
                    />
                  </Panel>
                );
              })}
            </Collapse>
          )}
        </>
      )}

      {isListsLoading && <Spin />}
      <Modal
        title="Создать список блоков"
        visible={visibleBlMod}
        onOk={async () => {
          await Api.createBlockList(newBlockListName);

          notification.success({
            message: `Список создан`,
            placement: "bottomRight",
          });

          hideModalBlMod();

          await getLists();
        }}
        onCancel={hideModalBlMod}
        okText="Сохранить"
        cancelText="Отменить"
      >
        <Input
          onChange={(e) => {
            setNewBlockListName(e.target.value);
          }}
          placeholder={"введите название списка"}
        />
      </Modal>

      <Modal
        title="Создать список объектов"
        visible={visibleObjMod}
        onOk={async () => {
          // if(entityName === 'building'){
          //     await Api.deleteBuildingList(id)
          // }else if(entityName === 'block'){
          //     await Api.deleteBlockList(id)
          // }

          await Api.createBuildingList(newBuildingListName);

          notification.success({
            message: `Элемент создан`,
            placement: "bottomRight",
          });

          hideModalObjMod();
          await getLists();
        }}
        onCancel={hideModalObjMod}
        okText="Сохранить"
        cancelText="Отменить"
      >
        <Input
          onChange={(e) => {
            setNewBuildingListName(e.target.value);
          }}
          placeholder={"введите название списка"}
        />
      </Modal>
    </>
  );
};

export default UsersLists;
