import { deleteCreator } from '@/api/admin';
import AddCreator from '@/components/admin/addCreator';
import Pagination from '@/components/admin/pagination';
import { Avatar, Button, Heading, Table, Text } from '@/components/common';
import { creators } from '@/types/admin';
import { CATEGORIES } from '@/utils/constants/signup';
import { getKeyByValue } from '@/utils/object';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as style from './style.css';
import user from '/assets/user.svg';

const COLUMNS = ['프로필', '이름', '카테고리명', '-'];

type CreatorsProps = creators & {
  onPrevClick: () => void;
  onNextClick: () => void;
};

const Creators = ({
  creators,
  currentPage,
  totalPage,
  onPrevClick,
  onNextClick,
}: CreatorsProps) => {
  const queryClient = useQueryClient();

  const deleteCreatorMutation = useMutation({
    mutationFn: deleteCreator,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['allCreators'],
      }),
  });

  const handleDeleteCreatorClick = (creatorId: number) => {
    if (!confirm('삭제 하시겠습니까?')) {
      return;
    }
    deleteCreatorMutation.mutate(creatorId);
  };

  return (
    <div className={style.container}>
      <Heading level={2}>크리에이터</Heading>
      <AddCreator />
      {!creators.length ? (
        <Heading level={5}>크리에이터가 없습니다.</Heading>
      ) : (
        <>
          <Table columns={COLUMNS}>
            {creators.map(
              ({ creatorId, profileImgUrl, name, categoryName }) => (
                <tr key={creatorId}>
                  <td>
                    <Avatar src={profileImgUrl || user} />
                  </td>
                  <td className={style.ellipsis}>
                    <Text>{name}</Text>
                  </td>
                  <td>
                    <Text>{getKeyByValue(CATEGORIES, categoryName)}</Text>
                  </td>
                  <td>
                    <Button
                      text="삭제"
                      version="blueInverted"
                      onClick={() => handleDeleteCreatorClick(creatorId)}
                    />
                  </td>
                </tr>
              )
            )}
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            onPrevClick={onPrevClick}
            onNextClick={onNextClick}
          />
        </>
      )}
    </div>
  );
};

export default Creators;
