import { Modal } from 'antd';
import Api from '../../../services/Api';
import styles from './ObjectCard.module.css';
import { useState } from 'react';
import BlockListsSelector from '../../RightMenu/BlocksListsSelector';

interface ObjectCardProps {
    props: {
        address: string;
        totalFloors: number;
        name: string;
        id: number;
        buildingClass: string;
        pics: {
            url: string;
        }[];
        blocks: {
            id: number;
            name: string;
            totalFloors: number;
            address: string;
            floor: number;
            blockType: string;
            area: string;
            salePrice: string;
            rentPrice: string;
            fullPriceAmount: string;
            monthPrice: string;
            finishing: string;
            isRent: boolean;
        }[];
    }
    isRent: boolean;
}

export const ObjectCard: React.FC<ObjectCardProps> = ({props, isRent}) => {
    const [showAll, setShowAll] = useState(false);
    const [sortField, setSortField] = useState<'floor' | 'area' | null>('floor');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: 'floor' | 'area') => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortedBlocks = () => {
        if (!sortField) return props.blocks;

        return [...props.blocks].sort((a, b) => {
            if (sortField === 'floor') {
                return sortDirection === 'asc' ? a.floor - b.floor : b.floor - a.floor;
            } else if (sortField === 'area') {
                const areaA = parseFloat(a.area);
                const areaB = parseFloat(b.area);
                return sortDirection === 'asc' ? areaA - areaB : areaB - areaA;
            }
            return 0;
        });
    };

    const getBrief = (blockId: number) => {
        open(`${Api.apiUrl}/exports/pdf-by-block/${blockId}`)
    }
    const getPP = (blockId: number) => {
        open(`${Api.apiUrl}/exports/pptx-by-block/${blockId}/`)
    }

    const saveToList = (blockId: number) => {
        Modal.info({
            title: 'Выберите списки для сохранения',
            content: <BlockListsSelector blockId={parseInt((blockId || '0').toString())}/>,
            maskClosable: true
        })
    }
    
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    return (
        <div className={styles.ObjectCard}>
            <div className={styles.ObjectCard__imageContainer}>
                {props.pics.length > 0 && <img
                    src={props.pics[0]?.url || ''}
                    alt="Фото объекта"
                    className={styles.ObjectCard__image}
                />}
                {props.pics.length === 0 && <div className={styles.ObjectCard__imageOverlay}>
                    Фотографий нет
                </div>}
            </div>
            
            <div className={styles.ObjectCard__content}>
                <div className={styles.ObjectCard__price}>
                    <a href={`/objects/${props.id}`}>{props.name}</a>, Класс {props.buildingClass}, {props.address}
                </div>
                {props.blocks.length > 0 && <div>
                    <div className={styles.ObjectCard__details}>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '10px'}}>
                            <div 
                                className={styles.sortableHeader}
                                style={{flex: '1', textAlign: 'center'}}
                                onClick={() => handleSort('floor')}
                            >
                                Этаж {sortField === 'floor' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </div>
                            <div style={{flex: '1', textAlign: 'center'}}>Тип</div>
                            <div 
                                className={styles.sortableHeader}
                                style={{flex: '1', textAlign: 'center'}}
                                onClick={() => handleSort('area')}
                            >
                                Площадь {sortField === 'area' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </div>
                            <div style={{flex: '1', textAlign: 'center'}}>{isRent ? 'Ставка' : 'Цена'}</div>
                            <div style={{flex: '1', textAlign: 'center'}}>{isRent ? 'Мес. арендный платеж' : 'Полная стоимость'}</div>
                            <div style={{flex: '1', textAlign: 'center'}}>Отделка</div>
                            <div style={{flex: '1', textAlign: 'center'}}></div>
                            <div style={{flex: '1', textAlign: 'center'}}></div>
                            <div style={{flex: '1', textAlign: 'center'}}></div>
                        </div>
                        {getSortedBlocks().slice(0, showAll ? props.blocks.length : 4).map((block) => (
                            <div key={'block_'+block.id} style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div key={'floor_'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    {block.floor} этаж
                                </div>
                                <div key={'type'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    {block.blockType}
                                </div>
                                <div key={'area'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    <a href={`/blocks/${block.id}`} target='_blank' rel="noreferrer">{block.area} м²</a>
                                </div>
                                <div key={'price'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    {formatPrice(block.isRent ? +block.rentPrice : +block.salePrice)}
                                </div>
                                <div key={'fullPrice'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    {formatPrice(block.isRent ? +block.monthPrice : +block.fullPriceAmount)}
                                </div>
                                <div key={'finishing'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    {block.finishing}
                                </div>
                                <div key={'pdf'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    <a href={`#`} onClick={() => getBrief(block.id)}>Бриф PDF</a>
                                </div>
                                <div key={'pptx'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                   <a href={`#`} onClick={() => getPP(block.id)}>Бриф PP</a>
                                </div>
                                <div key={'list'+block.id} style={{flex: '1', textAlign: 'center'}}>
                                    <a href={`#`} onClick={() => saveToList(block.id)}>В список</a>
                                </div>
                            </div>
                        ))}
                        {props.blocks.length > 4 && (
                            <div style={{textAlign: 'left', marginTop: '10px'}}>
                                <span 
                                    onClick={() => setShowAll(!showAll)}
                                    style={{
                                        cursor: 'pointer',
                                        color: '#0066cc',
                                        textDecoration: 'underline'
                                    }}
                                >
                                    {showAll ? 'Скрыть' : 'Показать ещё'}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <div className={styles.ObjectCard__address}>
                        
                    </div>
                </div>}
            </div>
        </div>
    );
};
