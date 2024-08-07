import {useRouter} from 'next/router';
import {useCallback} from 'react';

interface UseTableComponent {
  onClick: (type: string, id: string) => void;
}

export function useTableComponent(): UseTableComponent {
  const router = useRouter();

  const onClick = useCallback((type, id) => {
    (async () => {
      await router.push(`/${type}/${id}/1`);
    })();
  }, [router]);

  return {onClick};
}
