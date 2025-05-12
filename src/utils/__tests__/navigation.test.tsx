import {
  HOME_STACK_ROUTES,
  DISCOVER_STACK_ROUTES,
  HISTORY_STACK_ROUTES
} from '@navigation/tabs';
import { NavigationUtils } from '../navigation';

describe('NavigationUtils', () => {
  describe('getTabBarVisibility', () => {
    it('should return true for visible tab routes', () => {
      expect(
        NavigationUtils.getTabBarVisibility(HOME_STACK_ROUTES.HomeScreen)
      ).toBe(true);
      expect(
        NavigationUtils.getTabBarVisibility(
          DISCOVER_STACK_ROUTES.DiscoverScreen
        )
      ).toBe(true);
      expect(
        NavigationUtils.getTabBarVisibility(HISTORY_STACK_ROUTES.HistoryScreen)
      ).toBe(true);
    });

    it('should return false for non-visible routes', () => {
      // Add any non-visible route here
      expect(
        NavigationUtils.getTabBarVisibility('NonVisibleRoute' as any)
      ).toBe(false);
    });
  });
});
