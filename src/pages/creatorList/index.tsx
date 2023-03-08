import ButtonGroup from '@/components/buttonGroup';
import CreatorCard from '@/components/cardItem/creator';
import CardList from '@/components/cardList';
import { Spinner } from '@/components/common';
import { useCreatorListInfiniteQuery } from '@/hooks/infiniteQuery/useCreatorListInfiniteQuery';
import { selectedTabState } from '@/stores/tab';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRecoilState } from 'recoil';
import * as style from './style.css';

const CREATOR_CATEGORIES = ['all', 'develop', 'beauty', 'finance'];

const CreatorListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    CREATOR_CATEGORIES[0]
  );
  const [tabState, setTabState] = useRecoilState(selectedTabState);

  const { ref, inView } = useInView({ threshold: 0.9 });

  const {
    getContents,
    getNextPage,
    getContentsIsSuccess,
    getNextPageIsPossible,
    isFetchingNextPage,
    refetch,
  } = useCreatorListInfiniteQuery(selectedCategory);

  useEffect(() => {
    if (inView && getNextPageIsPossible) {
      getNextPage();
    }
  }, [inView, getNextPageIsPossible]);

  useEffect(() => {
    refetch();
  }, [selectedCategory]);

  useEffect(() => {
    setTabState('CREATORS');
  }, []);

  return (
    <div className={style.wrapper}>
      <ButtonGroup
        buttonData={CREATOR_CATEGORIES}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <CardList type="creator">
        {
          // 불러오는데 성공하고 데이터가 0개가 아닐 때 렌더링
          getContentsIsSuccess && getContents?.pages
            ? getContents.pages.map((page_data, page_num) => {
                const board_page = page_data.content_page;
                return board_page.map((item, idx) => {
                  if (
                    // 마지막 요소에 ref 달아주기
                    getContents.pages.length - 1 === page_num &&
                    board_page.length - 1 === idx
                  ) {
                    return (
                      // 마지막 요소에 ref 넣기 위해 div로 감싸기
                      <div
                        ref={ref}
                        key={item.creatorId}
                        style={{ width: '100%' }}
                      >
                        <CreatorCard {...item} />
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx} style={{ width: '100%' }}>
                        <CreatorCard {...item} />;
                      </div>
                    );
                  }
                });
              })
            : null
        }
        <div>
          {isFetchingNextPage && (
            <Spinner size="huge" style={{ zIndex: 9000 }} />
          )}
        </div>
      </CardList>
    </div>
  );
};

export default CreatorListPage;
